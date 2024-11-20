import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return new NextResponse("Missing fields");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return new NextResponse("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    
    if (!user) {
        throw new Error("User creation returned null");
      }
  
      console.log("User created", user);
      return new NextResponse(JSON.stringify({ user }), { status: 201 });

  } catch (error){
    console.log(error);
    throw new NextResponse("Failed to create user", { status: 500 });
  }
}