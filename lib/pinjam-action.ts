"use server";
import { prisma } from "@/lib/prisma";
import { removeFromCartByUserId } from "./cart-action";
import { DecreaseStock } from "./item-action";

export const checkoutCartAndCreatePinjam = async (
  userId: string,
  startDate: Date,
  endDate: Date,
  nama: string,
  namaOrmawa: string,
  nomorTelp: string,
  namaKegiatan: string,
  selectedItem: string[],
  pdflink: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const cartItems = await prisma.cart.findMany({
    where: {
      userId,
      id: {
        in: selectedItem,
      },
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
        pdflink,
      },
    });

    await prisma.pinjamItem.createMany({
      data: cartItems.map((cart) => ({
        pinjamId: pinjam.id,
        itemId: cart.productId,
        quantity: cart.quantity,
      })),
    });

    cartItems.forEach(async (cart) => {
      await DecreaseStock(cart.productId, cart.quantity);
    });

    await removeFromCartByUserId(userId);

    return pinjam;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to checkout cart");
  }
};

export const getPinjamById = async (id: string) => {
  return await prisma.pinjam.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          items: true,
        },
      },
    },
  });
};

export const getPinjamAll = async (query?: string) => {
  if (query) {
    return await prisma.pinjam.findMany({
      where: {
        OR: [
          {
            nama: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            namaOrmawa: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            namaKegiatan: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        items: {
          include: {
            items: true,
          },
        },
      },
    });
  } else {
    return await prisma.pinjam.findMany({
      include: {
        items: {
          include: {
            items: true,
          },
        },
      },
    });
  }
};

export const changePinjamStatus = async (id: string, status: string) => {
  return await prisma.pinjam.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};
