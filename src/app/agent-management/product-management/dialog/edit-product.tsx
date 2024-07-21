'use client';
import React, {useEffect, useState} from "react";
import {Button, FormProps, Modal} from "antd";
import AdjustProductForm
    from "@/app/agent-management/product-management/component/adjust-product-form/adjust-product-form";
import {ProductItem} from "@/model/product/product";
import {updateProduct} from "@/app/action/product";

interface EditProductProps {
    record?: any
}

const EditProduct: React.FC<EditProductProps> = (record: any) => {
    const [fields, setFields] = useState<ProductItem[]>([]);
    const [openEditDialog, setEditDialog] = useState<boolean>(false);

    useEffect(() => {
        const arr = Object.entries(record).map(([name, value]) => ({name, value}));
        setFields(arr)
    }, [record])

    const onFinishFailed = () => {

    }
    const onFinish: FormProps<ProductItem>['onFinish'] = (values: any) => {
        const dataSubmit = {
            name: values.name,
            description: values.description,
            image: values.image,
            quality: parseInt(values.quality),
            price: parseFloat(values.price),
            is_sale: values.is_sale,
            sale_price: parseFloat(values.sale_price),
        }
        updateProduct(record.id, dataSubmit);
    };
    return (
        <>
            <Button type={'text'} onClick={() => setEditDialog(true)}>Edit</Button>
            <Modal title={`Edit product ${record.name}`} open={openEditDialog} footer={null}
                   onCancel={() => setEditDialog(false)}>
                <AdjustProductForm fields={fields} onFinishFailed={onFinishFailed} onFinish={onFinish}/>
            </Modal>
        </>
    )
}
export default EditProduct;