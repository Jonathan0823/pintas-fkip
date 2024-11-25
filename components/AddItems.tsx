"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css"; // Import Cropper styles
import { ItemType } from "@/types/Items";
import { useEdgeStore } from "@/lib/edgestore";
import toast, { Toaster } from "react-hot-toast";
import { CreateItems } from "@/lib/item-action";

export default function AddItems() {
  const [itemCount, setItemCount] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [itemName, setItemName] = useState("Item Name");
  const [tersedia, setTersedia] = useState(true);

  const { edgestore } = useEdgeStore();

  const handleImageClick = () => {
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Reset file input
      fileInput.click(); // Trigger file input dialog
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedBase64 = cropper.getCroppedCanvas().toDataURL();

      const byteString = atob(croppedBase64.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });
      setImageFile(file);
      setCroppedImage(croppedBase64);
      setShowCropper(false);
    }
  };

  const cropperRef = useRef<ReactCropperElement | null>(null);

  const handleSubmit = async () => {
    if (!itemName || !imageFile) {
      toast.error("Please fill all fields");
    }
    if (itemCount < 1) {
      toast.error("Item count must be greater than 0");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    toast.loading("Uploading item...");
    const res = await edgestore.publicFiles.upload({
      file: imageFile,
    });
    const item: ItemType = {
      id: "",
      name: itemName,
      image: res.url,
      initialStock: itemCount,
      stock: itemCount,
      available: tersedia,
    };

    try {
      await CreateItems(item);
      toast.dismiss();
      toast.success("Item uploaded successfully");
      setItemName("Items Name");
      setImageFile(null);
      setImagePreview(null);
      setCroppedImage(null);
      setItemCount(0);
      setTersedia(true);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to upload item");
      console.log(error);
    }
  };

  return (
    <div className="w-full px-5 font-sans overflow-hidden">
      <Toaster />
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-4 rounded-md max-w-md w-full">
            <button
              onClick={() => setShowCropper(false)}
              className="text-white text-xl font-bold"
            >
              X
            </button>
            <Cropper
              src={imagePreview || ""}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1}
              preview=".img-preview"
              guides={false}
              ref={cropperRef}
            />
            <button
              onClick={handleCrop}
              className="bg-[#a17659] text-white p-2 rounded-full mt-4 w-full"
            >
              Crop Image
            </button>
          </div>
        </div>
      )}
      <div className="my-4 py-1 w-32 mx-auto text-white border-dashed rounded-full border-[#dcc0a9] border-2 bg-[#9d7c58]">
        <h1 className="text-xl font-semibold text-center">EDIT</h1>
      </div>

      <div className="flex-1 w-full">
        <Card className="w-full mx-auto bg-white/90 min-h-screen p-2 md:space-y-6 space-y-2">
          <div className="space-y-2 flex flex-col w-full items-center justify-center">
            <div className="flex justify-center">
              <button
                className="mx-auto py-1 bg-[#9d7c58] text-white rounded-full px-10"
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                ADD PHOTO
              </button>
            </div>
            <div className="bg-[#9d7c58] rounded-xl p-1 aspect-square flex items-center justify-center">
              <div className="relative w-72 mx-auto">
                <Image
                  src={croppedImage || imagePreview || "/defaultitems.png"}
                  alt="user-image"
                  width={100}
                  height={100}
                  className="mx-auto w-full h-full object-cover rounded-xl cursor-pointer"
                  onClick={handleImageClick}
                />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-center">
              <input
                type="text"
                className="md:px-20 px-10 py-1 bg-[#9d7c58] text-white rounded-full text-center"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onFocus={() => setItemName("")}
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
                value={itemCount}
                onChange={(e) =>
                  setItemCount(
                    Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
                  )
                }
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
              <button
                className={`text-center mb-2 px-2 rounded-full w-36 py-1 font-semibold ${
                  tersedia ? "bg-[#6b1010]" : ""
                }`}
                onClick={() => setTersedia(true)}
              >
                TERSEDIA
              </button>
              <button
                className={`text-center mb-2 px-2 rounded-full w-36 md:py-1 font-semibold ${
                  !tersedia ? "bg-[#6b1010]" : ""
                }`}
                onClick={() => setTersedia(false)}
              >
                TIDAK TERSEDIA
              </button>
            </div>
            <div className="justify-end flex p-1 md:p-2">
              <button
                className="px-5 py-3 rounded-full right-0 font-bold text-white bg-[#8b1515] hover:bg-[#6b1010]"
                onClick={handleSubmit}
              >
                DONE
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
