"use client";
import {Button, Checkbox, Form, FormProps, Input, Modal} from "antd";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import SignInForm from "@/app/components/form/sign-in";
import {SignInFieldType} from "@/model/form/form";

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
                console.log("SUCCESSFULLY SIGNED IN")
                // Here you can navigate to a new route, or perform any action as required
            } else {
                console.log("SIGN IN FAILED")
                // Here you can display an error message to the user
            }
        }
        catch (error) {
            console.error(error)
        }
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