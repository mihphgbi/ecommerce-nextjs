"use client";
import {Button, FormProps, Modal} from "antd";
import React, {useState} from "react";
import SignInForm from "@/app/components/form/sign-in";
import {useAppDispatch} from "@/lib/redux/hook";
import {login} from "@/lib/redux/action/auth";
import {useRouter} from 'next/navigation';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export default function SignInDialog() {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleOpenSignInPopup = () => {
        setOpenSignInPopup(true);
    }
    const handleClose = () => {
        setOpenSignInPopup(false);
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await dispatch(login(values)).unwrap();
            handleClose();
            // navigate to main page after successful login
            router.push('/');
            // router.push('/');
        } catch (err) {
            console.log('login failed', err);
            // alert displayed by thunk
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <>
            <Button type={'text'} onClick={handleOpenSignInPopup}>Sign in</Button>
            <Modal
                title="Sign in"
                open={openSignInPopup}
                footer={null}
                onCancel={handleClose}
                width={520}
                className={"auth-modal"}
            >
                <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
            </Modal>
        </>
    )
}
