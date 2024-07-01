'use client';
import React from "react";
import {FormProps} from "antd";
import SignUpForm from "@/app/components/form/sign-up";
import {SignUpFieldType} from "@/model/form/form";

const SignUpPage = () => {
    const onFinish: FormProps<SignUpFieldType>['onFinish'] = (values) => {
        // signIn();
        console.log('Success:', values);
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