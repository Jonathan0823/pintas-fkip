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
import { useEffect, useState } from "react";
import { getCurrentUserInfo } from "@/lib/GetCurrentUserInfo";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  status: z.string().min(2).max(50),
  telephone: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().optional(),
});

type ProfileProps = {
  name: string | "";
  email: string | "";
  image: string | "";
};

const Profile = ({ session }: { session: ProfileProps }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const email = session.email;

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: () => getCurrentUserInfo(email),
    enabled: !!email, // Only fetch if email is available
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      status: "",
      telephone: "",
      email: "", //
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.name || "",
        status: user.namaormawa || "",
        telephone: user.telepon || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user, form]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return toast.error("User not found");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Updating user...");
    const { username, status, telephone, email, password } = values;

    try {
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
          isAdmin: user?.isAdmin,
        }),
      });

      toast.dismiss();
      if (!response.ok) {
        toast.dismiss();
        toast.error("User update failed");
      }
      toast.success("User update");
      refetch();
    } catch {
      toast.dismiss();
      toast.error("User update failed");
    }
  }

  return (
    <Form {...form}>
      <Toaster />
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <Image
          src={imagePreview || "/defaultuser.png"}
          alt="user-image"
          width={100} // Image width in pixels
          height={100} // Image height in pixels
          className="mx-auto w-full h-full object-cover rounded-full cursor-pointer"
          onClick={() => document.getElementById("image-upload")?.click()} // Trigger file input on image click
        />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
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
