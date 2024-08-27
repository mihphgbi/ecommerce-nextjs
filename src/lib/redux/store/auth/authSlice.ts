import { createSlice } from '@reduxjs/toolkit'
import {login} from "@/lib/redux/action/auth";

// Define a type for the slice state
interface AuthState {
    isLogin: boolean,
    error: any,
}

// Define the initial state using that type
const initialState: AuthState = {
    isLogin: false,
    error: '',
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLogin = false
                // Add any fetched posts to the array
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogin = false
                state.error = action.error.message
            })
            .addCase(login.fulfilled,(state,action) => {
                state.isLogin = !state.isLogin;
            })
    }
})

export default authSlice.reducer