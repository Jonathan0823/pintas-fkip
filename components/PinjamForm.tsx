import { getCurrentUserInfo } from "@/lib/GetCurrentUserInfo";
import { User } from "@/types/User";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input } from "./ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useEdgeStore } from '../lib/edgestore';
import { checkoutCartAndCreatePinjam } from "@/lib/pinjam-action";

export default function PinjamForm({
  onClose,
  selected,
  onComplete
}: {
  onClose: () => void;
  selected: string[];
  onComplete: () => void;
}) {
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [namaKegiatan, setNamaKegiatan] = useState<string>("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchUser = async () => {
      const res = await getCurrentUserInfo(session?.user?.email || "");
      setUser(res);
    };

    fetchUser();
  }, [session]);

  const handleSubmit = async () => {
    if (!session) {
      return toast.error("Anda harus login terlebih dahulu");
    }
    if (!user || !startDate || !endDate || !namaKegiatan || !selected || !file) {
      return toast.error("Data tidak boleh kosong");
    }

    if (startDate > endDate) {
      return toast.error("Tanggal mulai tidak boleh lebih besar dari tanggal selesai");
    }
    if (file.type !== "application/pdf") {
      return toast.error("File harus berupa PDF");
    }
    toast.loading("Mengajukan peminjaman");
    try{
      const res = await edgestore.publicFiles.upload({
        file,
      });

      await checkoutCartAndCreatePinjam(
        session?.user?.id,
        new Date(startDate),
        new Date(endDate),
        user.name || "",
        user.namaormawa || "",
        user.telepon || "",
        namaKegiatan,
        selected,
        res.url
      )
      toast.dismiss();
      toast.success("Berhasil mengajukan peminjaman");
      onComplete();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      return toast.error("Gagal mengajukan peminjaman");
    }
    console.log(user, startDate, endDate, namaKegiatan, selected);
  }

  return (
    <div className="relative z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <Toaster />
      <div className="min-h-screen bg-[#fbf5f0] flex flex-col max-w-md w-full items-center ">
        <div
          className="text-[#997c5c] text-3xl md:text-4xl absolute top-1 left-2 hover:cursor-pointer"
          onClick={onClose}
        >
          <IoMdArrowRoundBack />
        </div>

        <div className="bg-[#8B2323] mt-10 md:mt-14 text-white text-center w-full py-4 px-6"
         style={{
          backgroundImage: "url('/bg/bg_isidata.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        >
          <h1 className="text-2xl font-semibold">ISI BIODATA</h1>
        </div>
        <p className="text-[#a17667] font-bold text-lg my-3">
          Lengkapi data-data berikut ini:
        </p>
        <div className="md:w-96 w-80 bg-white rounded-2xl border-2 border-black border-dashed flex flex-col max-w-md mx-4 shadow-lg">
          <div className="p-6 text-xs text-[#8B2323] font-bold">
            <form className="space-y-2 md:space-y-4">
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-300 focus:outline-none text-[#a17667] focus:border-[#8B2323]"
                  value={user?.name || ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, name: e.target.value } : undefined
                    )
                  }
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama Himpunan</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-300 focus:outline-none text-[#a17667] focus:border-[#8B2323]"
                  value={user?.namaormawa || ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, namaormawa: e.target.value } : undefined
                    )
                  }
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nomor Telepon</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="tel"
                  className="flex-1 border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                  value={user?.telepon || ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, telepon: e.target.value } : undefined
                    )
                  }
                />
              </div>
              <div className="flex">
                <label className="w-1/3 text-[#8B2323]">Nama Kegiatan</label>
                <span className="w-8 text-center">:</span>
                <input
                  type="text"
                  value={namaKegiatan}
                  onChange={(e) => setNamaKegiatan(e.target.value)}
                  className="flex-1 border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
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
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <p>Sampai :</p>
                    <input
                      type="date"
                      className="border-b border-gray-300 text-[#a17667] focus:outline-none focus:border-[#8B2323]"
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#8B2323] text-[10px] mt-10 md:mt-28">
                  Silahkan upload file surat peminjaman dibawah ini:
                </p>
                <p className="text-[#FF0000] text-[8px] mb-2">
                  *Wajib menyertakan surat peminjaman
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4  md:max-w-md mx-auto"
         style={{
          backgroundImage: "url('/bg/bg-form.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 pt-2 md:pt-6">
            <Input type="file" className="rounded-full border-[#9f9f9d] border-2 text-black bg-[#f9f6f1] pt-1" 
            onChange={(e) => setFile(e.target.files?.[0])}
            accept=".pdf"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-[#8B2323] text-white  rounded-3xl px-4 mb-1 py-2 mt-2 md:mt-4"
            onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
