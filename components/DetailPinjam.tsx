import { IoMdArrowRoundBack } from "react-icons/io";
import { getPinjamById } from "@/lib/pinjam-action";
import Link from "next/link";

export default async function DetailPinjam({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const data = await getPinjamById(id);
  console.log(data);

  return (
    <div className="absolute font-sans z-50 inset-0 bg-black/20 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="min-h-screen  flex flex-col max-w-md w-full items-center ">
        <div className="md:w-96 w-80 mt-11 bg-white rounded-2xl border-2 border-black border-dashed flex flex-col max-w-md mx-4 shadow-lg">
          <div className="p-6 relative text-xs text-[#8B2323] font-bold">
            <div className="text-[#997c5c] text-md md:text-lg absolute top-1 left-2 hover:cursor-pointer">
              <Link href="/process">
                <IoMdArrowRoundBack />
              </Link>
            </div>
            <div className="border-b-2 border-black flex justify-between">
              <div>
                <h1 className="text-black text-xl">{data?.namaOrmawa}</h1>
                <h2 className="ml-4">{data?.namaKegiatan}</h2>
              </div>
              {data?.startDate?.toISOString().split("T")[0]}
            </div>
            <form className="space-y-2 md:space-y-4 mt-2">
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-300 focus:outline-none text-[#a17667] focus:border-[#8B2323]"
                  value={data?.nama}
                  disabled
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama Himpunan</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-300 focus:outline-none text-[#a17667] focus:border-[#8B2323]"
                  value={data?.namaOrmawa}
                  disabled
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nomor Telepon</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="tel"
                  className="flex-1 border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                  value={data?.telepon}
                  disabled
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama Kegiatan</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  value={data?.namaKegiatan}
                  className="flex-1 border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                  disabled
                />
              </div>
              <div>
                <label className="block text-[#8B2323] mb-2">
                  Berapa lama peminjaman :
                </label>
                <div className="flex text-[#8B2323] gap-6">
                  <div>
                    <p>Dari :</p>
                    <input
                      type="date"
                      className="border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                      value={
                        data?.startDate
                          ? data.startDate.toISOString().split("T")[0]
                          : ""
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <p>Sampai :</p>
                    <input
                      type="date"
                      className="border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                      value={
                        data?.endDate
                          ? data.endDate.toISOString().split("T")[0]
                          : ""
                      }
                      disabled
                    />
                  </div>

                </div>
                  <div className="border-t-2 border-b-2 border-black mt-2">
                        test
                  </div>
                  <div>
                    
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
