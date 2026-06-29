'use client';
import React from "react";
import {Button, Form, FormProps, Input} from "antd";
import {SignUpFieldType} from "@/model/form/form";
import "./style.scss";

type SignUpFormProps = {
    onFinish: FormProps<SignUpFieldType>['onFinish'];
    onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'];
}

const SignUpForm = ({onFinish,onFinishFailed}: SignUpFormProps) => {
    return (
        <>
            <Form
                name="sign-up"
                className={"auth-form"}
                labelCol={{xs: 24, sm: 8}}
                wrapperCol={{xs: 24, sm: 16}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign={'left'}
                requiredMark={false}
            >
                <Form.Item<SignUpFieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input size={'large'} />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size={'large'} />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Re-enter Password"
                    name="rePassword"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size={'large'} />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Full name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input size={'large'}/>
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input size={'large'}/>
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                    <Input size={'large'}/>
                </Form.Item>

                <Form.Item wrapperCol={{xs: {span: 24}, sm: {offset: 8, span: 16}}}>
                    <Button type="primary" htmlType="submit" className={"auth-submit-button"}>
                       Create an account
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default SignUpForm
