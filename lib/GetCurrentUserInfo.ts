"use server"

import { prisma } from "./prisma"

export async function getCurrentUserInfo({ email }: { email: string }) {
    const res = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    if (!res) {
        throw new Error("User not found")
    }

    return res
}