'use client';

import React, { useEffect } from "react";
import { FormProps, message } from "antd";
import SignUpForm from "@/app/components/form/sign-up";
import { SignUpFieldType } from "@/model/form/form";
import { createUser } from "@/lib/redux/action/users";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const route = useRouter();

    useEffect(() => {
        if (isLogin) {
            route.push('/');
        }
    }, [isLogin, route]);

    const onFinish: FormProps<SignUpFieldType>['onFinish'] = async (values: SignUpFieldType) => {
        try {
            await dispatch(createUser(values)).unwrap();
            message.success('Create account success');
            route.push('/products');
        } catch (error) {
            message.error(typeof error === 'string' ? error : 'Create account failed');
        }
    };

    const onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={'form-wrapper'}>
            <SignUpForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
    );
};

export default SignUpPage;
