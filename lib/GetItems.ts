"use server";
import { prisma } from "./prisma";

export const GetItems = async () => {
  const res = await prisma.items.findMany();
  return res;
};

export const SearchItems = async (key: string) => {
  const res = await prisma.items.findMany({
    where: {
      name: {
        contains: key,
        mode: "insensitive",
      },
    },
  });
  return res;
};
