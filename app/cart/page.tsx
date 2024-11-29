"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  decreaseQuantity,
  getCartByUserId,
  increaseQuantity,
} from "@/lib/cart-action";
import { CartType } from "@/types/Cart";
import BackButton from "@/components/BackButton";
import PinjamForm from "@/components/PinjamForm";
import toast, { Toaster } from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

export default function Page() {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartType[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const FetchData = useCallback(async () => {
    if (!session) return;
    try {
      setLoading(true);
      const data = await getCartByUserId(session.user.id);
      setItems(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [session]);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  const incrementQuantity = async (id: string) => {
    try {
      setDisabled(true);
      await increaseQuantity(id);
    } catch (error) {
      console.error(error);
    }
    setDisabled(false);
  };

  const decrementQuantity = async (id: string) => {
    try {
      setDisabled(true);
      await decreaseQuantity(id);
    } catch (error) {
      console.error(error);
    }
    setDisabled(false);
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const selectedCount = selectedItems.length;

  return (
    <div className="w-full bg-[rgb(204,180,156)] font-sans">
      <Toaster />
      <div className="md:max-w-md mx-auto">
        <div className="min-h-screen bg-[#9d7c58] text-white">
          {modalOpen && (
            <PinjamForm
              onClose={() => setModalOpen(false)}
              selected={selectedItems}
              onComplete={FetchData}
            />
          )}
          <div className="flex items-center gap-2 p-4 bg-[#9d7c58] sticky top-0">
            <BackButton className="text-white text-2xl md:text-3xl mt-1" />

            <h1 className="text-xl font-medium">
              PINTAS Saya ({items.length})
            </h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="w-16 h-16 rounded-full flex items-center justify-center animate-spin">
                <ImSpinner8 className="w-10 h-10" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-[#9d7c58] border-t border-white/20"
                  >
                    <div
                      className={`w-6 h-6 border-2 rounded flex items-center justify-center cursor-pointer ${
                        selectedItems.includes(item.id)
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      onClick={() => toggleSelection(item.id)}
                    >
                      {selectedItems.includes(item.id) && (
                        <span className="text-white font-bold">✔</span>
                      )}
                    </div>
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={item.items?.image || "/defaultitems.webp"}
                        alt={item.items?.name || "item"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">
                        {item.items?.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full mt-5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#9d7c58]"
                        disabled={disabled}
                        onClick={() => {
                          setItems((prevItems) =>
                            prevItems
                              .map((prevItem) =>
                                prevItem.id === item.id
                                  ? {
                                      ...prevItem,
                                      quantity: prevItem.quantity - 1,
                                    }
                                  : prevItem
                              )
                              .filter((prevItem) => prevItem.quantity > 0)
                          );
                          decrementQuantity(item.id);
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center text-[#9d7c58]">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#9d7c58]"
                        disabled={disabled}
                        onClick={() => {
                          setItems((prevItems) =>
                            prevItems.map((prevItem) =>
                              prevItem.id === item.id
                                ? {
                                    ...prevItem,
                                    quantity: prevItem.quantity + 1,
                                  }
                                : prevItem
                            )
                          );
                          incrementQuantity(item.id);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fbf5f0] md:max-w-md mx-auto border-t border-white/20">
            <div className="flex items-center text-xl justify-between mb-4">
              <span className="text-[#9d7c58] font-bold">
                Pilihan ({selectedCount})
              </span>
              <Button
                className="w-20 rounded-full text-xl bg-[#86271c] hover:bg-[#682411] text-white"
                onClick={() => {
                  if (selectedCount > 0) {
                    setModalOpen(true);
                  } else {
                    toast.error("Pilih barang terlebih dahulu");
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
