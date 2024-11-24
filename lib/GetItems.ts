"use server";
import { ItemType } from "@/types/Items";
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

export const GetItem = async (id: string) => {
  const res = await prisma.items.findUnique({
    where: {
      id: id,
    },
  });
  return res;
};

export const EditItem = async (data: ItemType) => {
  const res = await prisma.items.update({
    where: {
      id: data.id,
    },
    data: data,
  });
  return res;
};


export const DeleteItem = async (id: string) => {
  const res = await prisma.items.delete({
    where: {
      id: id,
    },
  });
  return res;
}