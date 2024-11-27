"use server";
import { prisma } from "@/lib/prisma";
import { removeFromCartByUserId } from "./cart-action";

export const checkoutCartAndCreatePinjam = async (
  userId: string,
  startDate: Date,
  endDate: Date,
  nama: string,
  namaOrmawa: string,
  nomorTelp: string,
  namaKegiatan: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const cartItems = await prisma.cart.findMany({
    where: { userId },
    include: {
      items: true,
    },
  });

  if (cartItems.length === 0 || !user) {
    throw new Error("No items in the cart to checkout");
  }

  try {
    const pinjam = await prisma.pinjam.create({
      data: {
        userId,
        namaOrmawa,
        startDate,
        endDate,
        nama,
        namaKegiatan,
        telepon: nomorTelp,
      },
    });

    await prisma.pinjamItem.createMany({
      data: cartItems.map((cart) => ({
        pinjamId: pinjam.id,
        itemId: cart.productId,
        quantity: cart.quantity,
      })),
    });

    await removeFromCartByUserId(userId);

    return pinjam;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to checkout cart");
  }
};
