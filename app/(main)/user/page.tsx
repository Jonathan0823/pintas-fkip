import { auth } from "@/auth";
import { getCurrentUserInfo } from "@/lib/GetCurrentUserInfo";
import React from "react";

const Page = async () => {
  const session = await auth();
  const user = await getCurrentUserInfo({ email: session?.user?.email || "" });

  console.log(user);
  return (
    <>
      <div className="text-white mt-5 md:mt-10 text-center space-y-2 md:space-y-3">
        <h1 className="text-4xl">PINTAS FKIP</h1>
        <h1 className="text-3xl mt-3 tracking-tighter">PROFIL</h1>
      </div>
    </>
  );
};

export default Page;
