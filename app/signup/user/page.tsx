import BackButton from "@/components/BackButton";
import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/bg/bg.png)",
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full flex flex-col items-center relative"
    >
      <Image
        src="/unsikalogo.png"
        alt="unsika"
        width={100}
        height={100}
        className="absolute top-2 md:w-20 w-14"
      />
      <BackButton className="text-[#997c5c] text-4xl md:text-5xl absolute top-16 left-5" />
      <SignUpForm type="user" />
    </div>
  );
};

export default Page;
