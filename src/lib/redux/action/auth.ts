import {createAsyncThunk} from "@reduxjs/toolkit";
import {signIn} from "next-auth/react";
import {openErrorAlert, openSuccessAlert} from "@/lib/redux/store/layout/layoutSlice";


export const login = createAsyncThunk('auth/login', async (payload: any, {dispatch}) => {
    try {
        const response = await signIn('credentials', {
            username: payload.username,
            password: payload.password,
            redirect: true,
        });
            dispatch(openSuccessAlert({isOpenAlert: true, msgAlert: 'Log in success'}))
        if (response?.error) {
            throw new Error('Login failed');
        }
    } catch (error) {
        dispatch(openErrorAlert({isOpenAlert: true, msgAlert: 'Log in failed'}))
    }
})