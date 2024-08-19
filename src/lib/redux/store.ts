import { configureStore } from '@reduxjs/toolkit'
import {productSlice} from "@/lib/redux/store/product/productSlice";
import {authSlice} from "@/lib/redux/store/auth/authSlice";
import {layoutSlice} from "@/lib/redux/store/layout/layoutSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            products:productSlice.reducer,
            auth: authSlice.reducer,
            layout: layoutSlice.reducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']