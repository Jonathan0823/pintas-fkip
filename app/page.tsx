import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url(/bg/home_bg.png)",
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
        className="absolute top-2 w-20"
      />
      <div className="text-white mt-36 md:mt-44 text-center space-y-3">
        <h1 className="text-6xl">PINTAS FKIP</h1>
        <h2 className="text-xl tracking-[2px]">
          <span className="font-serif">(</span>
          PEMINJAMAN FASILITAS
          <span className="font-serif">)</span>
        </h2>
        <h2 className="text-4xl tracking-[0.1em]">FKIP UNSIKA</h2>
      </div>

      <div className="w-full flex flex-col mt-36 md:mt-48 px-6 text-center">
        <Link
          href="/login"
          className="bg-[#faf5ef] text-[#b49f8b] text-xl w-full tracking-widest relative py-3 font-bold rounded-xl"
        >
          <IoSearchOutline className="absolute top-1/2 right-4 text-3xl transform -translate-y-1/2" />
          LOG IN
        </Link>
      </div>
      <button className="bg-[#f8e6da] mt-3 text-[#b49f8b] px-6 tracking-widest relative py-3 font-bold rounded-full border border-black">
        SIGN UP
      </button>
      <Footer color="#9d7c58" />
    </div>
  );
}
