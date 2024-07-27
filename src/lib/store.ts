import { configureStore } from '@reduxjs/toolkit'
import {productSlice} from "@/lib/store/product/productSlice";
import {authSlice} from "@/lib/store/auth/authSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            products:productSlice.reducer,
            auth: authSlice.reducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']