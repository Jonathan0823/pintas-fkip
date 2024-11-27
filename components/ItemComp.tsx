"use client";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import "cropperjs/dist/cropper.css";
import { ItemType } from "@/types/Items";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "./BackButton";
import { addToCart } from "@/lib/cart-action";

export default function ItemComp({ item, userId }: { item: ItemType, userId: string }) {
  const [itemCount, setItemCount] = useState(0);

  const handleAddToCart = async () => {
    if (itemCount === 0) {
      return toast.error("Quantity cannot be 0");
    }
    toast.loading("Adding to Cart");
    console.log(itemCount, userId);
    try{
      await addToCart({ userId, productId: item.id, quantity: itemCount, id: "" });
      toast.dismiss();
      toast.success("Added to Cart");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to add to Cart");
    }
  };

  return (
    <div className="w-full px-5 font-sans overflow-hidden">
      <Toaster />
      <BackButton className="text-[#997c5c] text-4xl md:text-5xl absolute top-4 left-5" />

      <div className="flex-1 w-full">
        <Card className="w-full mt-24 md:mt-32 mx-auto border-[#9d7c58] border-[5px] bg-white/90 min-h-screen p-2 md:space-y-6 space-y-2">
          <div className="space-y-2 flex mt-5 md:mt-10 flex-col w-full items-center justify-center">
            <div className="bg-[#9d7c58] rounded-xl p-1 aspect-square flex items-center justify-center">
              <div className="relative w-60 mx-auto">
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
              <h1 className="md:px-20 text-3xl font-serif tracking-wider px-10 py-1 bg-[#9d7c58] text-white rounded-full text-center">
                {" "}
                {item.name}{" "}
              </h1>
            </div>

            <div className="flex justify-between px-2 gap-2 bg-[#9d7c58] w-28 mx-auto text-white rounded-full">
              <button
                onClick={() => setItemCount((prev) => Math.max(0, prev - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <p className="text-sm font-semibold min-w-[3ch] text-center bg-transparent border-none outline-none">
                {itemCount} / {item.stock}
              </p>
              <button
                onClick={() => setItemCount((prev) => Math.min(100, prev + 1))}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-[5px] border-[#9d7c58]">
            <div className="flex justify-center text-lg tracking-wider w-full items-center px-2 py-2 gap-4 bg-[#b89e81] text-white font-sans font-bold">
              {item.available ? <p>TERSEDIA</p> : <p>TIDAK TERSEDIA</p>}
            </div>
            <div className="justify-center flex p-1 md:p-2">
              <button
                className="px-5 py-3 rounded-full font-sans tracking-widest text-xl right-0 font-bold text-white bg-[#8b1515] hover:bg-[#6b1010]"
                onClick={handleAddToCart}
              >
                Pinjam
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
