'use client';

import { Button, FormProps, Modal, message } from "antd";
import React, { useState } from "react";
import SignUpForm from "@/app/components/form/sign-up";
import { SignUpFieldType } from "@/model/form/form";
import { createUser } from "@/lib/redux/action/users";
import { useAppDispatch } from "@/lib/redux/hook";

export default function SignUpDialog(): React.ReactElement {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleOpenSignInPopup = (): void => {
        setOpenSignInPopup(true);
    };

    const handleClose = (): void => {
        setOpenSignInPopup(false);
    };

    const onFinish: FormProps<SignUpFieldType>['onFinish'] = async (values: SignUpFieldType): Promise<void> => {
        try {
            await dispatch(createUser(values)).unwrap();
            handleClose();
            message.success('Create account success');
        } catch (error) {
            message.error(typeof error === 'string' ? error : 'Create account failed');
        }
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
                onCancel={handleClose}
                width={640}
                className={"auth-modal"}
            >
                <SignUpForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </Modal>
        </>
    );
}
