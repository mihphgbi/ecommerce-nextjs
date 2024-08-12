import {createAsyncThunk} from "@reduxjs/toolkit";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL

export const getUserProfile = () => {

}
export const createUser = createAsyncThunk( 'user/create',async (payload: any) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/auth/register`, {
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
