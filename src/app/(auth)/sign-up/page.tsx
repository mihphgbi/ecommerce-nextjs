'use client';
import React, {useEffect} from "react";
import {FormProps} from "antd";
import SignUpForm from "@/app/components/form/sign-up";
import {SignUpFieldType} from "@/model/form/form";
import {createUser} from "@/app/action/auth";
import {useAppDispatch, useAppSelector} from "@/lib/hook";
import {useRouter} from "next/navigation";

const SignUpPage = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const route = useRouter();
    useEffect(() => {
        if(isLogin) {
            route.push('/')
        }
    }, [isLogin]);

    const onFinish: FormProps<SignUpFieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        dispatch(createUser(values));
    };

    const onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <SignUpForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
        </>
    )
}
export default SignUpPage