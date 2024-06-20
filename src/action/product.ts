'use server';

// const name = FormData.get('name')?.toString
import prisma from "@/lib/db/prisma";
import { Prisma } from '@prisma/client'

export const createProduct = async (payload) => {
    try {
        await prisma.product.create({data:payload})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientValidationError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
            console.log(
                'Test success'
            )
        }
        throw e
    }
}

export const updateProduct = async (id, payload) => {
    try {
        const updateUser = await prisma.product.update({
            where: {
                id: id,
            },
            data: payload,
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientValidationError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
            console.log(
                'Test success'
            )
        }
        throw e
    }
}



export const deleteProduct = async (payload) => {
    try {
        await prisma.product.delete({
            where: {
                id: payload
            }
        })
    }
    catch (e) {
        console.log("========", e)
    }
}
