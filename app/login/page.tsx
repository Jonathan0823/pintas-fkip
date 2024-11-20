import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/bg/login_bg.png)",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
        }}
        className="w-full flex flex-col justify-center items-center relative"
      >
        <Image
          src="/unsikalogo.png"
          alt="unsika"
          width={100}
          height={100}
          className="absolute top-2 w-20"
        />
        <BackButton className="text-[#997c5c] text-5xl absolute top-16 left-5" />
        <div className="text-white mt-36 md:mt-44 text-center space-y-3">
          <h1 className="text-3xl">PINTAS FKIP</h1>
          <h2 className="text-lg tracking-[2px]">
            <span className="font-serif">(</span>
            PEMINJAMAN FASILITAS
            <span className="font-serif">)</span>
          </h2>
          <h2 className="text-xl tracking-[0.1em]">FKIP UNSIKA</h2>
        </div>
      </div>
      <Footer color="" />
    </div>
  );
};

export default Page;
