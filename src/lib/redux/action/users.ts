import {createAsyncThunk} from "@reduxjs/toolkit";

export const getUserProfile = createAsyncThunk('user/profile',async (payload: any) => {


})
export const createUser = createAsyncThunk( 'user/create',async (payload: any, {rejectWithValue}) => {
    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data?.error || 'Create account failed');
        }

        return data;
    } catch (error) {
        console.error('Failed to create user:', error);
        return rejectWithValue('Create account failed');
    }
})
