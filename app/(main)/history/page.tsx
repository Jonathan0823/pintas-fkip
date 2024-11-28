import HistoryTable from "@/components/HistoryTable";
import SearchButton from "@/components/SearchButton";
import Image from "next/image";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) => {
  const query = await searchParams;
  return (
    <>
      <Image
        src="/unsikalogo.webp"
        alt="unsika"
        width={100}
        height={100}
        className="absolute top-2 md:w-20 w-14"
      />
      <div className="mt-24 md:mt-32">
        <h1 className="tracking-widest text-center mb-2 text-white font-bold font-sans">
          RIWAYAT PEMINJAMAN
        </h1>
        <SearchButton name="history" />

        <HistoryTable query={query.search} />
      </div>
    </>
  );
};

export default Page;
