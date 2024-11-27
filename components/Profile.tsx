"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRef, useState } from "react";
import { User } from "@/types/User";
import { useEdgeStore } from "../lib/edgestore";
import Cropper, { ReactCropperElement } from "react-cropper"; // Import Cropper and its type
import "cropperjs/dist/cropper.css"; // Import Cropper styles

const formSchema = z.object({
  username: z.string().min(2).max(50),
  status: z.string().min(2).max(50),
  telephone: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().optional(),
});

const Profile = ({ user }: { user: User }) => {
  console.log(user);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [disabled, setDisabled] = useState(true);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.name || "",
      status: user.namaormawa || "",
      telephone: user.telepon || "",
      email: user.email || "",
      password: "",
    },
  });

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

  const handleImageClick = () => {
    // Reset the file input value to ensure change event triggers, even when selecting the same image
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Reset file input
      fileInput.click(); // Trigger file input dialog
    }
  };

  const cropperRef = useRef<ReactCropperElement | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Mengupdate user...");
    const { username, status, telephone, email, password } = values;

    try {
      let imageUrl;
      if (imageFile) {
        const res = await edgestore.publicFiles.upload({
          file: imageFile,
        });
        imageUrl = res.url;
        if (user.image){
          await edgestore.publicFiles.delete({
            url: user.image,
          });
        }

      }
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          namaormawa: status,
          telephone,
          email,
          password,
          isAdmin: user.isAdmin,
          image: imageFile ? imageUrl : "",
        }),
      });

      toast.dismiss();
      if (!response.ok) {
        toast.dismiss();
        toast.error("Gagal mengupdate user");
      }
      toast.success("Berhasil mengupdate user");
    } catch {
      toast.dismiss();
      toast.error("Gagal mengupdate user");
    }
  }

  return (
    <Form {...form}>
      <Toaster />
      <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
        <Image
          src={croppedImage || imagePreview || user.image || "/userprofile.jpg"}
          alt="user-image"
          width={100}
          height={100}
          className="mx-auto w-full h-full object-cover rounded-full cursor-pointer"
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

      <p
        className="font-sans text-white mt-2 hover:cursor-pointer mx-auto text-center"
        onClick={() => setDisabled((prev) => !prev)}
      >
        Edit Profil
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-1 text-black px-10 md:px-5 w-full mt-2 md:mt-3 flex flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-md tracking-wider">
                NAMA LENGKAP :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-md font-sans rounded-3xl border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-md tracking-wider">
                {user?.isAdmin ? (
                  <>
                    JABATAN<span className="font-sans">/</span>POSISI SAAT INI :
                  </>
                ) : (
                  "NAMA ORMAWA :"
                )}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-md font-sans rounded-3xl border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-md tracking-wider">
                NO TELEPON :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-md font-sans rounded-3xl border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-md tracking-wider">
                EMAIL :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-md font-sans rounded-3xl border-none"
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-md tracking-wider">
                PASSWORD :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-md font-sans rounded-3xl border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          role="button"
          tabIndex={0}
          className="mx-auto mt-2 md:mt-6 bg-[#86271c] hover:bg-[#691e15] text-white border-2 gap-10 flex items-center justify-center border-white rounded-full px-6 font-bold font-sans text-md py-2 cursor-pointer"
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.requestSubmit();
          }} // Submit the form
        >
          SAVE
        </div>
      </form>
    </Form>
  );
};

export default Profile;
