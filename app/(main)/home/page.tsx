import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <>
     
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
    </>
  );
};

export default Page;
