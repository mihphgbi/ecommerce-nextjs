"use client";
import {Button, FormProps, Modal} from "antd";
import React, {useState} from "react";
import SignUpForm from "@/app/components/form/sign-up";
import {SignUpFieldType} from "@/model/form/form";
import {createUser} from "@/app/action/auth";
import {useAppDispatch, useAppSelector} from "@/lib/hook";

export default function SignUpDialog() {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const handleOpenSignInPopup = () => {
        setOpenSignInPopup(true);
    }
    const handleClose = () => {
        setOpenSignInPopup(false);
    }

    const onFinish: FormProps<SignUpFieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        dispatch(createUser(values));
    };

    const onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button type={'primary'} onClick={handleOpenSignInPopup}>Sign up</Button>
            <Modal title="Sign up" open={openSignInPopup} footer={null} onCancel={handleClose || isLogin}>
                <SignUpForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
            </Modal>
        </>
    )
}