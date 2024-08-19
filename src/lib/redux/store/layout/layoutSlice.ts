import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LayoutState {
    activeItemMenu: string,
    isOpenAlert: boolean,
    alertStatus: string,
    msgAlert: string
}

const initialState: LayoutState = {
    activeItemMenu: '',
    isOpenAlert: false,
    alertStatus: '',
    msgAlert: ''
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        activeMenu: (state, action: PayloadAction<string>) => {
            state.activeItemMenu = action.payload
        },
        openWarningAlert: (state,action) => {
            state.isOpenAlert = action.payload.isOpenAlert
            state.alertStatus = 'warning'
            state.msgAlert = action.payload.msgAlert
        },
        openSuccessAlert: (state,action) => {
            state.isOpenAlert = action.payload.isOpenAlert
            state.alertStatus = 'success'
            state.msgAlert = action.payload.msgAlert
        },
        openErrorAlert: (state,action) => {
            state.isOpenAlert = action.payload.isOpenAlert
            state.alertStatus = 'error'
            state.msgAlert = action.payload.msgAlert
        },
        closeAlert: (state, action) => {
            state.isOpenAlert = false
            state.alertStatus = ''
            state.msgAlert = ''
        }
    },
})

// Action creators are generated for each case reducer function
export const {activeMenu, openWarningAlert, openSuccessAlert,openErrorAlert,closeAlert} = layoutSlice.actions

export default layoutSlice.reducer