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

export const decreaseQuantity = async (id: string) => {
  const cart = await prisma.cart.findUnique({
    where: {
      id,
    },
  });
  if (cart?.quantity === 1) {
    return await prisma.cart.delete({
      where: {
        id,
      },
    });
  }

  const updateCart = await prisma.cart.update({
    where: {
      id,
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });
  return updateCart;
};

export const increaseQuantity = async (id: string) => {
  const cart = await prisma.cart.update({
    where: {
      id,
    },
    data: {
      quantity: {
        increment: 1,
      },
    },
  });
  return cart;
};

//!used for checkout
export const removeFromCartByUserId = async (userId: string) => {
  const cart = await prisma.cart.deleteMany({
    where: {
      userId,
    },
  });
  return cart;
};