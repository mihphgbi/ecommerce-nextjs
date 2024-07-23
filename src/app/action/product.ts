'use client';

import {createAsyncThunk} from "@reduxjs/toolkit";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL
export const getProductData = createAsyncThunk('product/getList',async () => {
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
});

export const createProduct = createAsyncThunk('product/createItem',async (payload,ttt,yyy) => {
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
})

export const updateProduct = createAsyncThunk('product/updateItem',async (payload) => {
    try {
        // @ts-ignore
        const {id, data} = payload
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/products?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
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
})

export const deleteProduct =  createAsyncThunk('product/deleteItem', async (payload: any) => {
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
})
