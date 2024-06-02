'use client';
import {Button, Checkbox, Form, FormProps, Input} from "antd";
import React, {useState} from "react";
import {ProductItem} from "@/model/product/product";
import {createProduct} from "@/action/product";

const onFinish: FormProps<ProductItem>['onFinish'] = (values) => {
    const dataSubmit = {
        name: values.name,
        description: values.description,
        image: values.image,
        quality: parseInt(values.quality),
        price: parseFloat(values.price),
        is_sale: values.is_sale,
        sale_price: parseFloat(values.sale_price),
    }
    createProduct(dataSubmit);
};

const onFinishFailed: FormProps<ProductItem>['onFinishFailed'] = (errorInfo) => {
    console.debug('Failed:', errorInfo);
};

const AddProduct: React.FC = () => {
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [editObj, setEditObj] = useState<ProductItem>({
        id: '',
        name: '',
        description: '',
        image: '',
        quality: 0,
        price: 0,
        is_sale: false,
        sale_price: 0,
    })
    return (
        <>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<ProductItem>
                    label="Product name"
                    name="name"
                    rules={[{required: true, message: `Please input your product's name!`}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<ProductItem>
                    label="Description"
                    name="description"
                    rules={[{required: false}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<ProductItem>
                    label="Image"
                    name="image"
                    rules={[{required: false}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<ProductItem>
                    label="Quality"
                    name="quality"
                    rules={[{required: true, message: 'Please input your quantity!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<ProductItem>
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ProductItem>
                    name="is_sale"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox onChange={(e) => setComponentDisabled(e.target.checked)}>Sale</Checkbox>
                </Form.Item>

                <Form.Item<ProductItem>
                    label="Sale price"
                    name="sale_price"
                    rules={[{ required: componentDisabled, message: 'Please input your sale!' }]}
                    hidden={!componentDisabled}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default AddProduct