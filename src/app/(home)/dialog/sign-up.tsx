"use client";
import {Button, FormProps, Modal} from "antd";
import React, {useState} from "react";
import SignUpForm from "@/app/components/form/sign-up";
import {SignUpFieldType} from "@/model/form/form";
import {createUser} from "@/app/action/auth";

export default function SignUpDialog() {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
    const handleOpenSignInPopup = () => {
        setOpenSignInPopup(true);
    }
    const handleClose = () => {
        setOpenSignInPopup(false);
    }

    const onFinish: FormProps<SignUpFieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        createUser(values);
    };

    const onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button type={'primary'} onClick={handleOpenSignInPopup}>Sign up</Button>
            <Modal title="Sign up" open={openSignInPopup} footer={null} onCancel={handleClose}>
                <SignUpForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
            </Modal>
        </>
    )
}