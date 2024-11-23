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
import { FaUserCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";


const formSchema = z.object({
  username: z.string().min(2).max(50),
  status: z.string().min(2).max(50),
  telephone: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(3),
});

const SignUpForm = ({ type }: { type: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      status: "",
      telephone: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Creating user...");
    const { username, status, telephone, email, password } = values;

    if (!username || !status || !telephone || !email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          namaormawa: status,
          telephone,
          email,
          password,
          isAdmin: type === "admin",
        }),
      });

      toast.dismiss();
      if (!response.ok) {
        toast.dismiss();
        toast.error("User creation failed");
      }
      toast.success("User created");

      form.reset();
    } catch {
      form.reset();
      toast.dismiss();
      toast.error("User creation failed");
    }
  }

  return (
    <Form {...form}>
      <Toaster />
      <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mt-24 md:mt-32">
        BUAT AKUN
      </h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-1 text-[#706356] px-10 md:px-5 w-full mt-5 md:mt-10 flex flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black text-lg tracking-wider">
                NAMA LENGKAP :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-lg font-sans rounded-3xl border-none"
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
              <FormLabel className="text-black text-xl tracking-wider">
                {type === "admin" ? (
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
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-lg font-sans rounded-3xl border-none"
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
              <FormLabel className="text-black text-xl tracking-wider">
                NO TELEPON :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-lg font-sans rounded-3xl border-none"
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
              <FormLabel className="text-black text-xl tracking-wider">
                EMAIL :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-lg font-sans rounded-3xl border-none"
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
              <FormLabel className="text-black text-xl tracking-wider">
                PASSWORD :
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#f5e9dd] py-3 md:py-5 pl-5 !text-lg font-sans rounded-3xl border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          role="button"
          tabIndex={0}
          className="mx-auto mt-6 bg-[#86271c] hover:bg-[#691e15] text-white border-2 gap-10 flex items-center justify-center border-white rounded-full px-6 font-bold font-sans text-lg py-2 cursor-pointer"
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.requestSubmit();
          }}
        >
          SIGN UP
          <FaUserCircle className="text-3xl" />
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
