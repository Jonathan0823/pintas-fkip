"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";

interface Item {
  id: string;
  name: string;
  image: string;
  quantity: number;
  selected: boolean;
}

export default function Page() {
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      name: "Mimbar",
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      selected: true,
    },
    {
      id: "2",
      name: "Kabel HDMI",
      image: "/placeholder.svg?height=80&width=80",
      quantity: 3,
      selected: true,
    },
    {
      id: "3",
      name: "Sofa",
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      selected: true,
    },
    {
      id: "4",
      name: "Kursi Futura",
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      selected: false,
    },
    {
      id: "5",
      name: "Kursi Chitose",
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      selected: false,
    },
  ]);

  const selectedCount = items.filter((item) => item.selected).length;

  const updateQuantity = (id: string, increment: boolean) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = increment
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const toggleSelection = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div className="w-full bg-[rgb(204,180,156)] font-sans">
      <div className="md:max-w-md mx-auto">
        <div className="min-h-screen bg-[#8B6E4F] text-white">
          <div className="flex items-center gap-2 p-4 bg-[#8B6E4F] sticky top-0">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-medium">PINTAS Saya (5)</h1>
          </div>

          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-[#8B6E4F] border-t border-white/20"
              >
                <div
                  className="w-6 h-6 border-2 rounded flex items-center justify-center cursor-pointer"
                  onClick={() => toggleSelection(item.id)}
                >
                  {item.selected && (
                    <div className="w-4 h-4 bg-green-500 rounded-sm" />
                  )}
                </div>
                <div className="relative w-20 h-20 rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <div className="h-4 w-32 bg-white/20 rounded mt-1" />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={() => updateQuantity(item.id, false)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={() => updateQuantity(item.id, true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#8B6E4F] md:max-w-md mx-auto border-t border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span>Pilihan ({selectedCount})</span>
            </div>
            <Button className="w-full bg-[#8B2E15] hover:bg-[#7A2812] text-white">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
