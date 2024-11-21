import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();
  if (session) {
    return redirect("/home");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Page;
