"use server";
import { signIn, signOut } from "@/auth";

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function loginWithCreds(email: string, password: string) {
  await signIn("credentials", { email, password, redirect: false });
}
