import { createSlice } from '@reduxjs/toolkit'
// @ts-ignore
import {createProduct, deleteProduct, getProductData, updateProduct} from "@/app/action/product";

// Define a type for the slice state
interface ProductState {
    value: number,
    isDelete: boolean,
    loading: boolean,
    status: string,
    error: any,
    productList: any
}

// Define the initial state using that type
const initialState: ProductState = {
    value: 0,
    isDelete: false,
    loading: false,
    status: '',
    error: '',
    productList: []
}

export const productSlice = createSlice({
    name: 'product',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteProduct.pending, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteProduct.fulfilled,(state,action) => {
                state.isDelete = !state.isDelete;
            })
            .addCase(createProduct.pending, (state, action) => {

            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isDelete =!state.isDelete
            })
            .addCase(createProduct.rejected, (state, action) => {

            })
            .addCase(updateProduct.pending, (state, action) => {

            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isDelete =!state.isDelete
            })
            .addCase(updateProduct.rejected, (state, action) => {

            })
            .addCase(getProductData.fulfilled, (state, action) => {
                state.productList = action.payload
            })
    }
})

export default productSlice.reducer