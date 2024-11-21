import MenuDropdown from "@/components/MenuDropdown";
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
      <div className="text-[#997c5c] text-4xl md:text-5xl absolute top-16 left-5">
        <MenuDropdown />
      </div>
      <Image
        src="/unsikalogo.png"
        alt="unsika"
        width={100}
        height={100}
        className="absolute top-2 md:w-20 w-14"
      />
      <div className="text-white mt-36 md:mt-32 text-center space-y-2 md:space-y-3">
        <h1 className="text-6xl">PINTAS FKIP</h1>
        <h2 className="text-xl tracking-[2px]">
          <span className="font-serif">(</span>
          PEMINJAMAN FASILITAS
          <span className="font-serif">)</span>
        </h2>
        <h2 className="text-4xl tracking-[0.1em]">FKIP UNSIKA</h2>
      </div>
    </div>
  );
};

export default Page;
