"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartType[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const FetchData = async () => {
    if (!session) return;
    try {
      const data = await getCartByUserId(session.user.id);
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    FetchData();
  }, [session]);

  const incrementQuantity = async (id: string) => {
    try {
      await increaseQuantity(id);
    } catch (error) {
      console.error(error);
    }
  };

  const decrementQuantity = async (id: string) => {
    try {
      await decreaseQuantity(id);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const selectedCount = selectedItems.length;

  return (
    <div className="w-full bg-[rgb(204,180,156)] font-sans">
      <div className="md:max-w-md mx-auto">
        <div className="min-h-screen bg-[#9d7c58] text-white">
          <div className="flex items-center gap-2 p-4 bg-[#9d7c58] sticky top-0">
            <BackButton className="text-white text-2xl md:text-3xl mt-1" />

            <h1 className="text-xl font-medium">
              PINTAS Saya ({items.length})
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-[#9d7c58] border-t border-white/20"
              >
                <div
                  className="w-6 h-6 border-2 rounded flex items-center justify-center cursor-pointer"
                  onClick={() => toggleSelection(item.id)}
                >
                  {selectedItems.includes(item.id) && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <Image
                    src={item.items?.image || "/defaultitems.png"}
                    alt={item.items?.name || "item"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium">{item.items?.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={() => {
                      setItems((prevItems) =>
                        prevItems.map((prevItem) =>
                          prevItem.id === item.id
                            ? { ...prevItem, quantity: prevItem.quantity - 1 }
                            : prevItem
                        )
                      );
                      decrementQuantity(item.id);
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={() => {
                      setItems((prevItems) =>
                        prevItems.map((prevItem) =>
                          prevItem.id === item.id
                            ? { ...prevItem, quantity: prevItem.quantity + 1 }
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

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fbf5f0] md:max-w-md mx-auto border-t border-white/20">
            <div className="flex items-center text-xl justify-between mb-4">
              <span className="text-[#9d7c58] font-bold">
                Pilihan ({selectedCount})
              </span>
              <Link href="/pinjam" className="w-20 rounded-full text-xl bg-[#86271c] hover:bg-[#682411] text-white">
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
