'use client';

import { Button, FormProps, Modal } from "antd";
import React, { useState } from "react";
import SignUpForm from "@/app/components/form/sign-up";
import { SignUpFieldType } from "@/model/form/form";
import { createUser } from "@/lib/redux/action/users";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";

export default function SignUpDialog(): React.ReactElement {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(state => state.auth.isLogin);

    const handleOpenSignInPopup = (): void => {
        setOpenSignInPopup(true);
    };

    const handleClose = (): void => {
        setOpenSignInPopup(false);
    };

    const onFinish: FormProps<SignUpFieldType>['onFinish'] = (values: SignUpFieldType): void => {
        console.log('Success:', values);
        dispatch(createUser(values));
    };

    const onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'] = (errorInfo: any): void => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button type="primary" onClick={handleOpenSignInPopup}>Sign up</Button>
            <Modal
                title="Sign up"
                open={openSignInPopup}
                footer={null}
                onCancel={handleClose} // Fixed here, only call handleClose
            >
                <SignUpForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </Modal>
        </>
    );
}
