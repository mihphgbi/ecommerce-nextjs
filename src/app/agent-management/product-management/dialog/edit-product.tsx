'use client';
import React, {useEffect, useState} from "react";
import {Button, FormProps, Modal} from "antd";
import AdjustProductForm
    from "@/app/agent-management/product-management/component/adjust-product-form/adjust-product-form";
import {ProductItem} from "@/model/product/product";
import {updateProduct} from "@/app/action/product";
import {useAppDispatch} from "@/lib/hook";

interface EditProductProps {
    record?: any
}

const EditProduct: React.FC<EditProductProps> = ({record}) => {
    const dispatch = useAppDispatch();
    const [fields, setFields] = useState<ProductItem[]>([]);
    const [openEditDialog, setEditDialog] = useState<boolean>(false);

    useEffect(() => {
        const arr = Object.entries(record).map(([name, value]) => ({name, value}));
        setFields(arr)
    }, [record])

    const onFinishFailed = () => {

    }
    const onFinish: FormProps<ProductItem>['onFinish'] = (values: any) => {
        const data = {
            name: values.name,
            description: values.description,
            image: values.image,
            quality: parseInt(values.quality),
            price: parseFloat(values.price),
            is_sale: values.is_sale,
            sale_price: values.is_sale ? parseFloat(values.sale_price) : 0,
        }
        dispatch(updateProduct({id: record.id, data}));
        setEditDialog(false)
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