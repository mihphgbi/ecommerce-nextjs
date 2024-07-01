import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {SignUpFieldType} from "@/model/form/form";

const SignUpForm = ({onFinish,onFinishFailed}) => {
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item<SignUpFieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Re-enter Password"
                    name="rePassword"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<SignUpFieldType>
                    name="isSeller"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Is seller</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default SignUpForm