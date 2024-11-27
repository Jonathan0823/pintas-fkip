import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function PinjamForm({ onClose }: { onClose: () => void }) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="relative z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="min-h-screen bg-[#fbf5f0] flex flex-col max-w-md w-full items-center ">
        <div className="text-[#997c5c] text-3xl md:text-4xl absolute top-1 left-2 hover:cursor-pointer" onClick={onClose}>
          <IoMdArrowRoundBack />
        </div>

        <div className="bg-[#8B2323] mt-14 text-white text-center w-full py-4 px-6">
          <h1 className="text-2xl font-semibold">ISI BIODATA</h1>
        </div>
        <p className="text-[#a17667] font-bold text-lg my-3">
          Lengkapi data-data berikut ini:
        </p>
        <div className="md:w-96 w-80 bg-white rounded-2xl border-2 border-black border-dashed flex flex-col max-w-md mx-4 shadow-lg">
          <div className="p-6 text-xs text-[#8B2323] font-bold">
            <form className="space-y-4">
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-300 focus:outline-none text-[#a17667] focus:border-[#8B2323]"
                  defaultValue="YULIA AGNESIA"
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama Himpunan</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-300 focus:outline-none text-[#a17667] focus:border-[#8B2323]"
                  defaultValue="ASEED"
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nomor Telepon</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="tel"
                  className="flex-1 border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                  defaultValue="08572234345"
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama Kegiatan</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                />
              </div>
              <div>
                <label className="block text-[#8B2323] mb-2">
                  Berapa lama peminjaman :
                </label>
                <div className="flex text-[#8B2323]">
                    <div>Dari</div>
                    <div>Sampai</div>
                </div>
              </div>
              <div >
                <p className="text-[#8B2323] text-[10px] mt-28">
                  Silahkan upload file surat peminjaman dibawah ini:
                </p>
                <p className="text-[#FF0000] text-[8px] mb-2">
                  *Wajib menyertakan surat peminjaman
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button
            type="submit"
            className="w-full bg-[#8B2323] hover:bg-[#722323] text-white py-2 rounded-md transition duration-300"
          >
            UPLOAD FILE
          </button>
        </div>
      </div>
    </div>
  );
}
