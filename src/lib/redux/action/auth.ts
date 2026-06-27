import {createAsyncThunk} from "@reduxjs/toolkit";
import {signIn} from "next-auth/react";
import {openErrorAlert, openSuccessAlert} from "@/lib/redux/store/layout/layoutSlice";


export const login = createAsyncThunk('auth/login', async (payload: any, {dispatch, rejectWithValue}) => {
    try {
        // Use redirect: false so signIn returns a response object we can inspect
        const response = await signIn('credentials', {
            username: payload.username,
            password: payload.password,
            redirect: false,
        }) as any;

        // Helpful debug - remove or lower verbosity as needed
        // console.debug('signIn response', response);

        // If signIn returns undefined (unexpected) treat it as failure but avoid letting NextAuth redirect
        if (typeof response === 'undefined') {
            dispatch(openErrorAlert({isOpenAlert: true, msgAlert: 'Log in failed (no response)'}));
            return rejectWithValue('No response from signIn');
        }

        // If signIn returned an error -> dispatch error alert and reject
        if (response?.error) {
            dispatch(openErrorAlert({isOpenAlert: true, msgAlert: response.error || 'Log in failed'}));
            return rejectWithValue(response.error || 'Log in failed');
        }

        // If signIn indicates success (ok or status) -> dispatch success
        if (response?.ok || response?.status === 200 || response?.url) {
            dispatch(openSuccessAlert({isOpenAlert: true, msgAlert: 'Log in success'}));
            return response;
        }

        // Fallback: unknown response -> treat as failure
        dispatch(openErrorAlert({isOpenAlert: true, msgAlert: 'Log in failed'}));
        return rejectWithValue('Unknown signIn response');
    } catch (error: any) {
        dispatch(openErrorAlert({isOpenAlert: true, msgAlert: 'Log in failed'}));
        // Return a rejected value so extraReducers can handle it
        return rejectWithValue(error?.message || 'Log in failed');
    }
});
