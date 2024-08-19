'use client';
import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {SignUpFieldType} from "@/model/form/form";

const SignUpForm = ({onFinish,onFinishFailed}) => {
    return (
        <>
            <Form
                name="sign-up"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ minWidth: 450, maxWidth: 600 }}
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
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input size={'large'}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                       Create an account
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default SignUpForm