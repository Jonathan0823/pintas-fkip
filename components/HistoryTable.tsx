import React from "react";

export default function HistoryTable() {
  const tableData = [
    {
      namaOrmawa: "ASEED",
      namaKegiatan: "SPECTASEED",
      tanggal: "12-08-2024\n13-08-2024",
      keterangan: "BOOKING",
    },
    {
      namaOrmawa: "HIMAPMTK",
      namaKegiatan: "NATIONAL SEMINAR",
      tanggal: "05-08-2024\n07-08-2024",
      keterangan: "SELESAI",
    },
    {
      namaOrmawa: "HIMAPJKR",
      namaKegiatan: "JAMBORE",
      tanggal: "25-07-2024\n27-07-2024",
      keterangan: "SELESAI",
    },
    {
      namaOrmawa: "BEM",
      namaKegiatan: "PORSEMA",
      tanggal: "05-07-2024\n07-07-2024",
      keterangan: "SELESAI",
    },
    {
      namaOrmawa: "BLM",
      namaKegiatan: "PEMIRA FKIP",
      tanggal: "10-06-2024\n12-06-2024",
      keterangan: "SELESAI",
    },
    {
      namaOrmawa: "HIMADIKSATRASIA",
      namaKegiatan: "FRAKSI",
      tanggal: "01-06-2024\n02-06-2024",
      keterangan: "SELESAI",
    },
    {
      namaOrmawa: "HIMAPENMAS",
      namaKegiatan: "NATIONAL SEMINAR",
      tanggal: "20-05-2024\n23-05-2024",
      keterangan: "SELESAI",
    },
    {
      namaOrmawa: "ASEED",
      namaKegiatan: "PRA-EFEST",
      tanggal: "07-05-2024\n09-05-2024",
      keterangan: "SELESAI",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="p-4 text-white bg-[#8B4513] rounded-xl">
              Nama Ormawa
            </th>
            <th className="p-4 text-white bg-[#CD853F] rounded-xl">
              Nama Kegiatan
            </th>
            <th className="p-4 text-white bg-[#CD853F] rounded-xl">
              Tanggal Mulai & Selesai
            </th>
            <th className="p-4 text-white bg-[#CD853F] rounded-xl">
              Keterangan
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td
                className={`p-4 rounded-xl font-bold text-[#8B4513] ${
                  index % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#DEB887]"
                }`}
              >
                {row.namaOrmawa}
              </td>
              <td
                className={`p-4 rounded-xl text-[#8B4513] ${
                  index % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#DEB887]"
                }`}
              >
                {row.namaKegiatan}
              </td>
              <td
                className={`p-4 rounded-xl text-[#8B4513] whitespace-pre-line ${
                  index % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#DEB887]"
                }`}
              >
                {row.tanggal}
              </td>
              <td
                className={`p-4 rounded-xl ${
                  index % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#DEB887]"
                }`}
              >
                <span
                  className={`inline-block w-full text-center py-1 rounded-lg ${
                    row.keterangan === "BOOKING" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {row.keterangan}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
