"use server";
import { ItemType } from "@/types/Items";
import { prisma } from "./prisma";

export const CreateItems = async (items: ItemType) => {
  const res = await prisma.items.create({
      data: {
          name: items.name,
          image: items.image,
          initialStock: items.stock,
          stock: items.stock,
          available: items.available,
      }
  })

  return res
}

export const GetItems = async (query?: string) => {
  if (query) {
    const res = await prisma.items.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    return res;
  }
  const res = await prisma.items.findMany();
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