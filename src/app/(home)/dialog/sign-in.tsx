"use client";
import {Button, Checkbox, Form, FormProps, Input, Modal} from "antd";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import SignInForm from "@/app/components/form/sign-in";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export default function SignInDialog() {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);

    const handleOpenSignInPopup = () => {
        setOpenSignInPopup(true);
    }
    const handleClose = () => {
        setOpenSignInPopup(false);
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        signIn();
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
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