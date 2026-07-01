'use client';

import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductItem} from "@/model/product/product";

type ProductListParams = {
    product_type_id?: string;
    agent_only?: boolean;
    page?: number;
    limit?: number;
};

const buildProductListUrl = (params?: ProductListParams) => {
    const searchParams = new URLSearchParams();

    if (params?.product_type_id) {
        searchParams.set('product_type_id', params.product_type_id);
    }

    if (params?.agent_only) {
        searchParams.set('agent_only', 'true');
    }

    if (params?.page) {
        searchParams.set('page', params.page.toString());
    }

    if (params?.limit) {
        searchParams.set('limit', params.limit.toString());
    }

    const queryString = searchParams.toString();

    return queryString ? `/api/products?${queryString}` : '/api/products';
}

export const getProductData = createAsyncThunk('product/getList',async (params?: ProductListParams) => {
    try {
        const response = await fetch(buildProductListUrl(params), {
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
