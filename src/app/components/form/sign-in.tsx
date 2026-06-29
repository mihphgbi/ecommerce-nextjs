'use client';
import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {SignInFieldType} from "@/model/form/form";
import "./style.scss";

// @ts-ignore
const SignInForm = ({onFinish,onFinishFailed}) => {
    return (
        <>
            <Form
                name="sign-in"
                className={"auth-form"}
                labelCol={{xs: 24, sm: 5}}
                wrapperCol={{xs: 24, sm: 19}}
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
                    <Col xs={24} sm={12}>
                        <Form.Item<SignInFieldType>
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={"auth-submit-button"}>
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
