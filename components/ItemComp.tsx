"use client"
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import "cropperjs/dist/cropper.css";
import { ItemType } from "@/types/Items";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function EditItems({ item }: { item: ItemType }) {
  const [itemCount, setItemCount] = useState(0);

  const handleOrder = () => {
    console.log("Ordering item");
    toast.success("Item ordered");
  }

  return (
    <div className="w-full px-5 font-sans overflow-hidden">
      <div className="my-4 py-1 w-32 mx-auto text-white border-dashed rounded-full border-[#dcc0a9] border-2 bg-[#9d7c58]">
        <h1 className="text-xl font-semibold text-center">EDIT</h1>
      </div>
      <Toaster />


      <div className="flex-1 w-full">
        <Card className="w-full mx-auto bg-white/90 min-h-screen p-2 md:space-y-6 space-y-2">
          <div className="space-y-2 flex flex-col w-full items-center justify-center">
            <div className="flex justify-center"></div>
            <div className="bg-[#9d7c58] rounded-xl p-1 aspect-square flex items-center justify-center">
              <div className="relative w-72 mx-auto">
                <Image
                  src={item.image || "/defaultitems.png"}
                  alt="user-image"
                  width={100}
                  height={100}
                  className="mx-auto w-full h-full object-cover rounded-xl cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-center">
              <input
                type="text"
                className="md:px-20 px-10 py-1 bg-[#9d7c58] text-white rounded-full text-center"
                value={item.name}
                disabled
              />
            </div>

            <div className="flex justify-center px-2 gap-2 bg-[#9d7c58] w-32 mx-auto text-white rounded-full">
              <button
                onClick={() => setItemCount((prev) => Math.max(0, prev - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                className="text-xl font-semibold min-w-[3ch] text-center bg-transparent border-none outline-none"
                value={`${itemCount} / ${item.stock}`}
                disabled
              />
              <button
                onClick={() => setItemCount((prev) => Math.min(100, prev + 1))}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-[5px] border-[#9d7c58]">
            <div className="flex justify-between items-center px-2 py-2 gap-4 bg-[#b89e81] text-white text-xs md:text-base">
              {item.available ? (
                <p className="font-bold">Tersedia</p>
              ) : (
                <p className="font-bold">Tidak Tersedia</p>
              )}
            </div>
            <div className="justify-end flex p-1 md:p-2">
              <button
                className="px-5 py-3 rounded-full right-0 font-bold text-white bg-[#8b1515] hover:bg-[#6b1010]"
                onClick={handleOrder}
              >
                Pesan
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
