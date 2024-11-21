"use client";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaUserCircle } from "react-icons/fa";
import { z } from "zod";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/bg/login_bg.png)",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
        }}
        className="w-full flex flex-col justify-center items-center relative"
      >
        <Image
          src="/unsikalogo.png"
          alt="unsika"
          width={100}
          height={100}
          className="absolute top-2 md:w-20 w-14"
        />
        <BackButton className="text-[#997c5c] text-4xl md:text-5xl absolute top-16 left-5" />
        <div className="text-white mt-56 md:mt-44 text-center space-y-1">
          <h1 className="text-5xl">PINTAS FKIP</h1>
          <h2 className="text-md tracking-[2px]">
            <span className="font-serif">(</span>
            PEMINJAMAN FASILITAS
            <span className="font-serif">)</span>
          </h2>
          <h2 className="text-2xl tracking-[0.1em]">FKIP UNSIKA</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5  text-[#b99f83] px-10 w-full mt-5 md:mt-10 flex flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="bg-[#fbf5f0] py-6 pl-20 !text-lg font-sans rounded-xl"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            const form = document.querySelector("form");
                            if (form) form.requestSubmit();
                          }
                        }}
                      />
                      <FormLabel className="absolute text-lg top-1/2 left-4 font-bold transform -translate-y-1/2">
                        EMAIL :
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="bg-[#fbf5f0] py-6 pl-32 rounded-xl font-sans !text-lg"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            const form = document.querySelector("form");
                            if (form) form.requestSubmit();
                          }
                        }}
                      />
                      <FormLabel className="absolute top-1/2 left-4 text-lg font-bold transform -translate-y-1/2">
                        PASSWORD :
                      </FormLabel>

                      <div
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              role="button"
              tabIndex={0}
              className="mx-auto bg-[#86271c] hover:bg-[#691e15] text-white border-2 gap-10 flex items-center justify-center border-white rounded-full px-6 font-bold font-sans text-xl py-2 cursor-pointer"
              onClick={() => {
                const form = document.querySelector("form");
                if (form) form.requestSubmit();
              }} // Submit the form
            >
              LOGIN
              <FaUserCircle className="text-4xl" />
            </div>
          </form>
        </Form>
      </div>
      <Footer color="" />
    </div>
  );
};

export default Page;
