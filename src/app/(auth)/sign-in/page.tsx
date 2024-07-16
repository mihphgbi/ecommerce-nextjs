'use client';
import SignInForm from "@/app/components/form/sign-in";
import {SignInFieldType} from "@/model/form/form";
import {FormProps} from "antd";
import { signIn } from 'next-auth/react';

const SignInPage = () => {


    const onFinish: FormProps<SignInFieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        const response = await signIn('credentials', {
            username: values.username,
            password: values.password,
            redirect: false,
        });

        if (!response.error) {
            console.log("SUCCESSFULLY SIGNED IN")
            // Here you can navigate to a new route, or perform any action as required
        } else {
            console.log("SIGN IN FAILED")
            // Here you can display an error message to the user
        }
    };

    const onFinishFailed: FormProps<SignInFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
        </>
    )
}
export default SignInPage