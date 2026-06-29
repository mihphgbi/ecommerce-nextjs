'use client';

import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductItem} from "@/model/product/product";

export const getProductData = createAsyncThunk('product/getList',async () => {
    try {
        const response = await fetch('/api/products', {
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

export const createProduct = createAsyncThunk('product/createItem',async (payload: ProductItem) => {
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
})

export const updateProduct = createAsyncThunk('product/updateItem',async (payload: {id: string, data: ProductItem}) => {
    try {
        const {id, data} = payload
        const response = await fetch(`/api/products?id=${id}`, {
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
        throw error;
    }
})

export const deleteProduct =  createAsyncThunk('product/deleteItem', async (payload: string) => {
    try {
        const response = await fetch(`/api/products?id=${payload}`, {
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
        throw error;
    }
})
