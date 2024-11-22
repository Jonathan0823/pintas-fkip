import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import { getCurrentUserInfo } from "@/lib/GetCurrentUserInfo";
import Image from "next/image";
import React from "react";


const Page = async () => {
  const session = await auth();
  const user = await getCurrentUserInfo({ email: session?.user?.email || "" });
  


  console.log(user);
  return (
    <>
      <div className="text-white mt-5 md:mt-10 text-center space-y-1 md:space-y-2">
        <h1 className="text-3xl">PINTAS FKIP</h1>
        <h1 className="text-2xl mt-3 tracking-tighter">PROFIL</h1>
      </div>
      <Image src="/defaultuser.png" alt="user-image" width={100} height={100} className="mx-auto w-24 md:w-32" />
      <Profile user={user} />
      <Footer color=""/>
    </>
  );
};

export default Page;
