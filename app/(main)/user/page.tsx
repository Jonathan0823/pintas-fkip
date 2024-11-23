import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import { getCurrentUserInfo } from "@/lib/GetCurrentUserInfo";
import React from "react";

const Page = async () => {
  const session = await auth();
  const user = await getCurrentUserInfo(session?.user?.email || "");

  return (
    <>
      <div className="text-white mt-5 md:mt-10 text-center space-y-1 md:space-y-2">
        <h1 className="text-3xl">PINTAS FKIP</h1>
        <h1 className="text-2xl mt-3 tracking-tighter">PROFIL</h1>
      </div>
      {session?.user && <Profile user={user} />}
      <Footer color="" />
    </>
  );
};

export default Page;
