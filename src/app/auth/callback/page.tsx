"use client"
import { checkAuthStatus } from "@/action/auth.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => await checkAuthStatus(),
  });

  if (data?.success) {
    router.push("/");
    return null;
  }

  return (
    <div className="mt-20 w-full flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader className=" w-20 h-10 animate-spin text-muted-foreground" />

        <h3 className=" text-xl font-bold">Redirecting...</h3>
        <p className="">Please wait </p>
      </div>
    </div>
  );
}

export default Page;
