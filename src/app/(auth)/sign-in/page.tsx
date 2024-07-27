'use client';
import SignInForm from "@/app/components/form/sign-in";
import {SignInFieldType} from "@/model/form/form";
import {FormProps} from "antd";
import {signIn} from 'next-auth/react';
import Link from "next/link";

const SignInPage = () => {
    const onFinish: FormProps<SignInFieldType>['onFinish'] = async (values) => {
        'use sever';
        try {
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
        } catch (error) {
            console.error(error)
        }

    };

    const onFinishFailed: FormProps<SignInFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
            <p>Do not have an account? <Link href={'/sign-up'} className={'text-blue-600'}>Sign up</Link></p>
        </>
    )
}
export default SignInPage