'use client';

import { Button, FormProps, Modal } from "antd";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import SignInForm from "@/app/components/form/sign-in";
import { openErrorAlert, openSuccessAlert } from "@/lib/redux/store/layout/layoutSlice";
import { useAppDispatch } from "@/lib/redux/hook";
import { login } from "@/lib/redux/action/auth";

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean; // It's better to use a boolean for `remember`
};

export default function SignInDialog(): React.ReactElement {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleOpenSignInPopup = (): void => {
        setOpenSignInPopup(true);
    };

    const handleClose = (): void => {
        setOpenSignInPopup(false);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType): Promise<void> => {
        dispatch(login(values));
        // 'use server';
        // try {
        //     console.log('Success:', values);
        //     const response = await signIn('credentials', {
        //         username: values.username,
        //         password: values.password,
        //         redirect: false,
        //     });
        //
        //     if (!response.error) {
        //         'use client';
        //         handleClose();
        //         dispatch(openSuccessAlert({ isOpenAlert: true, msgAlert: 'Log in success' }));
        //         // Here you can navigate to a new route, or perform any action as required
        //     } else {
        //         'use client';
        //         dispatch(openErrorAlert({ isOpenAlert: true, msgAlert: 'Log in failed' }));
        //         // Here you can display an error message to the user
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: any): void => {
        console.error('Failed:', errorInfo);
    };

    return (
        <>
            <Button type="text" onClick={handleOpenSignInPopup}>Sign in</Button>
            <Modal title="Sign in" open={openSignInPopup} footer={null} onCancel={handleClose}>
                <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </Modal>
        </>
    );
}
