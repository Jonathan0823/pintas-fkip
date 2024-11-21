"use server";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function logout() {
    await signOut({ redirectTo: "/" });
    revalidatePath("/");
  }
  
  export async function loginWithCreds(email: string, password: string) {
    await signIn("credentials", { email, password, redirectTo: "/home" });
    revalidatePath("/home");
  }
  