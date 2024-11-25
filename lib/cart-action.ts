"use server";

import { CartType } from "@/types/Cart";
import { prisma } from "./prisma";

export const addToCart = async (item: CartType) => {
  const cart = await prisma.cart.create({
    data: {
      userId: item.userId,
      productId: item.productId,
      quantity: item.quantity,
    },
  });
  return cart;
};

export const removeFromCart = async (id: string) => {
  const cart = await prisma.cart.delete({
    where: {
      id,
    },
  });
  return cart;
};
