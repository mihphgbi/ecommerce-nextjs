"use client";
import {Button, Checkbox, Form, FormProps, Input, Modal} from "antd";
import React, {useState} from "react";
import {signIn} from "next-auth/react";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export default function SignInDialog() {
    const [openSignInPopup, setOpenSignInPopup] = useState<boolean>(false);

    const handleOpenSignInPopup = () => {
        setOpenSignInPopup(true);
    }
    const handleClose = () => {
        setOpenSignInPopup(false);
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        signIn();
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOk = () => {

    }
    return (
        <>
            <Button type={'text'} onClick={handleOpenSignInPopup}>Sign in</Button>
            <Modal title="Sign in" open={openSignInPopup} footer={null} onCancel={handleClose}>
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
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}