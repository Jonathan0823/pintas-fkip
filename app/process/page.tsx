import PinjamTable from "@/components/PinjamTable";
import SearchButton from "@/components/SearchButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string, show: boolean, id: string }>;
}) => {
  const query = await searchParams;
  const show = query?.show || false;
  const id = query?.id || "";

  return (
    <div className="w-full bg-[rgb(204,180,156)]">
      <div className="md:max-w-md mx-auto">
        <div
          style={{
            backgroundImage: "url(/bg/bg.webp)",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full flex flex-col items-center relative overflow-hidden bg-fixed md:bg-local"
        >
          <Image
            src="/unsikalogo.webp"
            alt="unsika"
            width={100}
            height={100}
            className="absolute top-2 md:w-20 w-14"
          />
          <div className="mt-24 md:mt-32">
            <h1 className="tracking-widest text-center mb-2 text-white font-bold font-sans">
              ALUR SURAT PEMINJAMAN
            </h1>
            <SearchButton name="process" />
          </div>

          <Link href="/home" className="text-[#997c5c] text-3xl md:text-4xl absolute top-1 left-2">
            <IoMdArrowRoundBack />
          </Link>
          <PinjamTable query={query?.search || ""} show={show} id={id}/>
        </div>
      </div>
    </div>
  );
};

export default Page;
