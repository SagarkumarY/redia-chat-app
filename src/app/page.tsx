import ChatLayout from "@/components/chat/ChatLayout";
import Preferences from "../components/Preferences";
import { cookies } from "next/headers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { User } from "@/db/dummy";
import { redis } from "@/lib/db";

async function getUsers(): Promise<User[]> {
  const userKeys: string[] = [];
  let cursor = "0";

  // Loop to fetch all user keys from Redis using the SCAN command
  do {
    // SCAN command to get keys that match "user:*" pattern, fetching up to 100 at a time
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: "user:*",
      type: "hash",
      count: 100,
    });
    cursor = nextCursor; // Update the cursor to the next position
    userKeys.push(...keys); // Add the fetched keys to the userKeys array
  } while (cursor !== "0"); // Continue scanning until the cursor returns to "0", indicating the end

  // Get the current user from the Kinde session
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  // Initialize a Redis pipeline to fetch all user details in one go
  const pipeline = redis.pipeline();
  userKeys.forEach((key) => pipeline.hgetall(key)); // Queue HGETALL commands for each user key
  const result = (await pipeline.exec()) as User[]; // Execute the pipeline and cast the result to an array of User objects

  const users: User[] = []; // Initialize an array to hold the users that will be returned
  for (const user of result) {
    // Loop through the fetched users
    if (user.id !== currentUser?.id) {
      // Exclude the currently logged-in user
      users.push(user); // Add the user to the users array
    }
  }

  return users; // Return the array of users
}

export default async function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) return redirect("/auth");

  const users = await getUsers();


  return (
    <>
      <main className=" flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
        <Preferences />

        {/* "dotted bg" */}

        <div
          className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
				dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"
          aria-hidden="true"
        />
        <div className=" z-10  border rounded-lg w-full max-w-5xl min-h-[85vh] text-sm lg:flex">
          <ChatLayout defaultLayout={defaultLayout} users={users} />
        </div>
      </main>
    </>
  );
}
