import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, namaormawa, telephone, email, password, isAdmin } = body;

  if (!name || !email || !password || !namaormawa || !telephone || isAdmin === undefined) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return new NextResponse("User already exists", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email,
        namaormawa,
        telepon: telephone,
        isAdmin,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new Error("User creation returned null");
    }

    console.log("User created", user);
    return new NextResponse(JSON.stringify({ user }), { status: 201 });
  } catch (error) {
    console.log(error);
    throw new NextResponse("Failed to create user", { status: 500 });
  }
}
