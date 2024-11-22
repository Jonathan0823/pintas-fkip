import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { name, namaormawa, telephone, email, password, isAdmin } = body;

  if (
    !name ||
    !email ||
    !namaormawa ||
    !telephone ||
    isAdmin === undefined
  ) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return new NextResponse("User is not found", { status: 400 });
  }

  const updateData: {
    name: string;
    email: string;
    namaormawa: string;
    telepon: string;
    isAdmin: boolean;
    password?: string;
  } = {
    name,
    email,
    namaormawa,
    telepon: telephone,
    isAdmin,
  };

  if (password && password.trim() !== "") {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const user = await prisma.user.update({
        where: { email },
        data: updateData,
    });

    if (!user) {
      throw new Error("User update returned null");
    }

    console.log("User updated", user);
    return new NextResponse(JSON.stringify({ user }), { status: 201 });
  } catch (error) {
    console.log(error);
    throw new NextResponse("Failed to update user", { status: 500 });
  }
}
