'use server';

// const name = FormData.get('name')?.toString
import prisma from "@/lib/db/prisma";

export const createProduct = async (payload) => {
    try {
        await prisma.product.create({data:payload})
    } catch (e) {
        console.log(e)
    }
}
