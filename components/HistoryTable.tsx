import { getPinjamAll } from "@/lib/pinjam-action";
import React from "react";

export default async function HistoryTable({query}: {query: string}) {
  const data = await getPinjamAll(query || "");

  const keterangan = (enddate: Date) => {
    const now = new Date();
    if (now > enddate) return "SELESAI";
    return "BOOKING";
  };
  
  const minimumRows = 8;
  const rows = data.length >= minimumRows 
    ? data 
    : [...data, ...Array.from({ length: minimumRows - data.length }, () => ({
        namaOrmawa: "",
        namaKegiatan: "",
        startDate: "",
        endDate: "",
      }))];

  return (
    <div className="md:max-w-md p-2 bg-white rounded-t-3xl border-[5px] border-red-800 mt-5 min-h-screen rounded-2xl shadow font-sans">
      <table className="md:max-w-md w-full border-separate border-spacing-2">
        <thead>
          <tr className="text-xs">
            <th className="p-2 text-white bg-[#9d7c58] rounded-xl">
              Nama Ormawa
            </th>
            <th className="p-2 text-white bg-[#9d7c58] rounded-xl">
              Nama Kegiatan
            </th>
            <th className="p-2 text-white bg-[#9d7c58] rounded-xl">
              Tanggal Mulai & Selesai
            </th>
            <th className="p-2 text-white bg-[#9d7c58] rounded-xl">
              Keterangan
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="text-xs h-11">
              <td
                className={`p-2 rounded-xl font-bold text-center text-[#8B4513] bg-[#dcc0a9]`}
              >
                {row.namaOrmawa}
              </td>
              <td className={`p-2 rounded-xl font-bold text-center text-[#8B4513] bg-[#dcc0a9]`}>
                {row.namaKegiatan}
              </td>
              <td
                className={`p-2 rounded-xl font-bold text-center text-[#8B4513] whitespace-pre-line bg-[#dcc0a9]`}
              >
                <div>{row.startDate ? new Date(row.startDate).toLocaleDateString() : ""}</div>
                <div>{row.endDate ? new Date(row.endDate).toLocaleDateString() : ""}</div>
              </td>
              <td className={`p-2 rounded-xl bg-[#dcc0a9]`}>
                <span
                  className={`inline-block w-full text-center py-1 rounded-lg font-bold ${
                    keterangan(new Date(row.endDate)) === "BOOKING"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {row.namaOrmawa ? keterangan(new Date(row.endDate)) : ""}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
