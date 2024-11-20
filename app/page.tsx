import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url(/bg/home_bg.png)",
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
      <div className="text-white text-center">
        <h1>PINTAS FKIP</h1>
        <h2>(PEMINJAMAN FASILITAS)</h2>
        <h2>FKIP UNSIKA</h2>
      </div>
      <Footer color="#9d7c58" />
    </div>
  );
}
