import Image from "next/image";
import React from "react";
import AuthButtons from "./AuthButtons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function page() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) return redirect("/");
  return (
    <div className="flex  h-screen w-full">
      <div className="flex-1 flex overflow-hidden dark:bg-[#651c2b55] bg-[#652c2b] relative justify-center items-center">
        <img
          src="/redis-logo.svg"
          alt="redis-logo"
          className=" ] absolute -left-1/4 opacity-25 -bottom-52 lg:scale-125 xl:scale-[2] pointer-events-none select-none  -z-1"
        />
        <div className="flex flex-col px-2 gap-2 xl:ml-[8rem] text-center md:text-start font-semibold">
          <Image
            src={"/logo.png"}
            alt="redistash logo"
            width={763}
            height={173}
            className="mt-20 w-[420px] z-0 pointer-events-none select-none"
          />
          <p className=" text-2xl md:text-3xl text-balance z-10">
            The{" "}
            <span className="bg-red-500 px-2 font-bold text-white">
              ULTIMATE{" "}
            </span>
            chat app{" "}
          </p>
          <p className=" text-2xl md:text-3xl mb-32 text-balance z-10">
            You{" "}
            <span className="bg-green-500/90 fontn-bold px-2 text-white">
              NEED TO{" "}
            </span>
            build
          </p>
          <AuthButtons />
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden justify-center  items-center hidden md:flex bg-noise">
        <Image
          src={"/hero-right.png"}
          alt="hero png"
          fill
          className=" object-fill dark:opacity-60 opacity-90 pointer-events-none select-none h-full"
        />
      </div>
    </div>
  );
}

export default page;
