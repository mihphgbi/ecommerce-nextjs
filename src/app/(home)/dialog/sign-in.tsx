"use client";
import {Button, FormProps, Modal} from "antd";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import SignInForm from "@/app/components/form/sign-in";
import {openErrorAlert, openSuccessAlert} from "@/lib/redux/store/layout/layoutSlice";
import {useAppDispatch} from "@/lib/redux/hook";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export default function SignInDialog() {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleOpenSignInPopup = () => {
        setOpenSignInPopup(true);
    }
    const handleClose = () => {
        setOpenSignInPopup(false);
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        'use sever';
        try {
            console.log('Success:', values);
            const response = await signIn('credentials', {
                username: values.username,
                password: values.password,
                redirect: false,
            });

            if (!response.error) {
                'use client';
                handleClose();
                dispatch(openSuccessAlert({isOpenAlert: true, msgAlert: 'Log in success'}))
                // Here you can navigate to a new route, or perform any action as required
            } else {
                'use client';
                dispatch(openErrorAlert({isOpenAlert: true, msgAlert: 'Log in failed'}))
                // Here you can display an error message to the user
            }
        }
        catch (error) {
            console.error(error)
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <>
            <Button type={'text'} onClick={handleOpenSignInPopup}>Sign in</Button>
            <Modal title="Sign in" open={openSignInPopup} footer={null} onCancel={handleClose}>
                <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
            </Modal>
        </>
    )
}