'use client';
import React, {useState} from "react";
import {Button, Modal} from "antd";
import AdjustProductForm
    from "@/app/agent-management/product-management/component/adjust-product-form/adjust-product-form";

const EditProduct: React.FC = () => {
    const [openEditDialog, setEditDialog] = useState<boolean>(false);
    const onFinishFailed = () => {

    }
    const onFinish = () => {

    }
    return (
        <>
            <Button type={'text'} onClick={() => setEditDialog(true)}>Edit</Button>
            <Modal title="Sign in" open={openEditDialog} footer={null} onCancel={() => setEditDialog(true)}>
                <AdjustProductForm onFinishFailed={onFinishFailed} onFinish={onFinish}/>
            </Modal>
        </>
    )
}
export default EditProduct;