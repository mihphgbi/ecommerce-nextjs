'use client';
import SignInForm from "@/app/components/form/sign-in";
import {SignInFieldType} from "@/model/form/form";
import {FormProps} from "antd";
import {signIn} from 'next-auth/react';
import Link from "next/link";
import {login} from "@/lib/redux/action/auth";
import {useAppDispatch} from "@/lib/redux/hook";

const SignInPage = () => {
    const dispatch = useAppDispatch();

    const onFinish: FormProps<SignInFieldType>['onFinish'] = async (values) => {
        dispatch(login(values))
    };

    const onFinishFailed: FormProps<SignInFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
            <div className={'form-wrapper'}>
                <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
                <p>Do not have an account? <Link href={'/sign-up'} className={'text-blue-600'}>Sign up</Link></p>
            </div>
    )
}
export default SignInPage