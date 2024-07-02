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
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/products`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export const updateProduct = async (id, payload) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/products?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
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
