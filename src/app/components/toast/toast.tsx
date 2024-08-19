'use client';

import React, {useEffect, useState} from "react";
import {Alert} from "antd";
import {useDispatch} from "react-redux";
import {closeAlert} from "@/lib/redux/store/layout/layoutSlice";


type ToastAlertProps = {
    message: string,
    description?: string,
    type?: 'success' | 'info' | 'warning' | 'error',
    showIcon?: boolean,
    open: boolean
}

const ToastAlert: React.FC<ToastAlertProps> = ({...props}) => {
    const dispatch = useDispatch();
    const {open} = props
    const [openToast, setOpen] = useState(open);
    const handleClose = () => {
        setOpen(false);
        dispatch(closeAlert())
    }
    useEffect(() => {
        setTimeout(() => {
            handleClose();
        },2000)
    }, []);
    return (
        <>
            <div className={'fixed top-20 right-3 max-w-80'}>
                {openToast && <Alert
                    {...props}
					closable
					onClose={handleClose}
				/>}
            </div>
        </>
    )
}
export default ToastAlert;