"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function AddItems() {
  const [itemCount, setItemCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full px-5">
      <h1 className="text-xl font-semibold text-center">EDIT</h1>

      <div className="flex-1 w-full">
        <Card className="w-full mx-auto bg-white/90 p-6 space-y-6">
          {/* Photo Upload Section */}
          <div className="space-y-2">
            <Button
              className="w-full bg-[#b39b7d] hover:bg-[#8b7355]"
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              ADD PHOTO
            </Button>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedImage(URL.createObjectURL(file));
                }
              }}
            />
            <div className="border-2 border-dashed border-[#b39b7d] rounded-lg p-2 aspect-square flex items-center justify-center">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Selected item"
                  width={200}
                  height={200}
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-sky-200 to-green-200 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Item Name Section */}
          <div className="space-y-2">
            <Button className="w-full bg-[#b39b7d] hover:bg-[#8b7355]">
              ITEM NAME
            </Button>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setItemCount(Math.max(0, itemCount - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold min-w-[3ch] text-center">
                {itemCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setItemCount(itemCount + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Availability Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-center mb-2 text-[#8b7355] font-semibold">
                TERSEDIA
              </h3>
              <div className="border-2 border-dashed border-[#b39b7d] rounded-lg p-4 h-24"></div>
            </div>
            <div>
              <h3 className="text-center mb-2 text-[#8b7355] font-semibold">
                TIDAK TERSEDIA
              </h3>
              <div className="border-2 border-dashed border-[#b39b7d] rounded-lg p-4 h-24"></div>
            </div>
          </div>

          {/* Types Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[#8b7355] font-semibold">TYPES</span>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-[#b39b7d] rounded-full h-10"></div>
              <div className="border-2 border-dashed border-[#b39b7d] rounded-full h-10"></div>
            </div>
          </div>

          <Button className="w-full bg-[#8b1515] hover:bg-[#6b1010]">
            DONE
          </Button>
        </Card>
      </div>
    </div>
  );
}
