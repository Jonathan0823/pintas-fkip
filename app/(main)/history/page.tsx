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
      <div className="mt-24 md:mt-32">
        <h1 className="tracking-widest text-white font-bold font-sans">RIWAYAT PEMINJAMAN</h1>
      </div>
    </>
  );
};

export default Page;