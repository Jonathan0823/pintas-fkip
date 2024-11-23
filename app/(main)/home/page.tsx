import Footer from "@/components/Footer";
import MainMenu from "@/components/MainMenu";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

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
      <div className="text-white text-3xl absolute p-2 top-16 right-5 rounded-full bg-[#a17659] shadow-md border-[#997c5c]">
        <Link href="home/cart">
          <IoCartOutline className="transition-transform -rotate-12 hover:rotate-0" />
        </Link>
      </div>
      <div className="text-white mt-24 md:mt-32 text-center space-y-1 md:space-y-2">
        <h1 className="text-3xl">PINTAS FKIP</h1>
        <h2 className="text-[10px] tracking-[2px]">
          <span className="font-serif">(</span>
          PEMINJAMAN FASILITAS
          <span className="font-serif">)</span>
        </h2>
        <h2 className="text-xl tracking-[0.1em]">FKIP UNSIKA</h2>
      </div>
      
      <main>
        <MainMenu />
      </main>
      <Footer color="" />
    </>
  );
};

export default Page;
