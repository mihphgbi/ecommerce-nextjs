'use client';

// const name = FormData.get('name')?.toString
import prisma from "@/lib/db/prisma";
import { Prisma } from '@prisma/client'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL
export const getProductData = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json()
        return data.data || [];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
};

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
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/products?id=${payload}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.ok;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}
