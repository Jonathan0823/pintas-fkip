"use server"

import { ItemType } from "@/types/Items"
import { prisma } from "./prisma"

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