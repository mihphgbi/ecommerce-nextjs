'use client';
import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {SignInFieldType} from "@/model/form/form";

const SignInForm = ({onFinish,onFinishFailed}) => {
    return (
        <>
            <Form
                name="sign-in"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                style={{ minWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={false}
                labelAlign='left'

            >
                <Form.Item<SignInFieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input size={'large'} />
                </Form.Item>

                <Form.Item<SignInFieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size={'large'} />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item<SignInFieldType>
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default SignInForm