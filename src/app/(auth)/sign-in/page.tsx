'use client';

import SignInForm from "@/app/components/form/sign-in";
import { SignInFieldType } from "@/model/form/form";
import { FormProps } from "antd";
import { login } from "@/lib/redux/action/auth";
import { useAppDispatch } from "@/lib/redux/hook";
import Link from "next/link";
import React from "react";

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const onFinish: FormProps<SignInFieldType>['onFinish'] = async (values: SignInFieldType) => {
        dispatch(login(values));
    };

    const onFinishFailed: FormProps<SignInFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={'form-wrapper'}>
            <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
            <p>Do not have an account? <Link href={'/sign-up'} className={'text-blue-600'}>Sign up</Link></p>
        </div>
    );
};

export default SignInPage;
