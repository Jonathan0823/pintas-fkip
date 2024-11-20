"use client";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";

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
          className="absolute top-2 w-20"
        />
        <BackButton className="text-[#997c5c] text-5xl absolute top-16 left-5" />
        <div className="text-white mt-36 md:mt-44 text-center space-y-3">
          <h1 className="text-3xl">PINTAS FKIP</h1>
          <h2 className="text-lg tracking-[2px]">
            <span className="font-serif">(</span>
            PEMINJAMAN FASILITAS
            <span className="font-serif">)</span>
          </h2>
          <h2 className="text-xl tracking-[0.1em]">FKIP UNSIKA</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5  text-[#b99f83] px-10 w-full flex flex-col"
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
                      />
                      <FormLabel className="absolute text-lg top-1/2 left-4 font-bold transform -translate-y-1/2">
                        EMAIL
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
                        type="password"
                        {...field}
                        className="bg-[#fbf5f0] py-6 pl-32 rounded-xl font-sans !text-lg"
                      />
                      <FormLabel className="absolute top-1/2 left-4 text-lg font-bold transform -translate-y-1/2">
                        PASSWORD
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              style={{ width: "fit-content" }}
              className="mx-auto bg-[#86271c] text-white border-2 flex border-white rounded-full px-6 font-bold font-sans text-xl py-5 "
            >
              LOGIN
            </Button>
          </form>
        </Form>
      </div>
      <Footer color="" />
    </div>
  );
};

export default Page;
