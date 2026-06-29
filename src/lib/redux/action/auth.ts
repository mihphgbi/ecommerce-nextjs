import {createAsyncThunk} from "@reduxjs/toolkit";
import {signIn} from "next-auth/react";
import {openErrorAlert, openSuccessAlert} from "@/lib/redux/store/layout/layoutSlice";


export const login = createAsyncThunk('auth/login', async (payload: any, {dispatch, rejectWithValue}) => {
    try {
        const response = await signIn('credentials', {
            username: payload.username,
            password: payload.password,
            redirect: false,
        }) as any;

        if (typeof response === 'undefined') {
            dispatch(openErrorAlert({isOpenAlert: true, msgAlert: 'Log in failed (no response)'}));
            return rejectWithValue('No response from signIn');
        }

        if (response?.ok && response?.status === 200) {
            dispatch(openSuccessAlert({isOpenAlert: true, msgAlert: 'Log in success'}));
            return response;
        }

        const errorMessage = response?.error === 'CredentialsSignin'
            ? 'Invalid username or password'
            : response?.error || 'Log in failed';

        dispatch(openErrorAlert({isOpenAlert: true, msgAlert: errorMessage}));
        return rejectWithValue(errorMessage);
    } catch (error: any) {
        dispatch(openErrorAlert({isOpenAlert: true, msgAlert: 'Log in failed'}));
        return rejectWithValue(error?.message || 'Log in failed');
    }
});
