'use client';
import React, {useState} from "react";
import {Button, Modal} from "antd";

const EditProduct: React.FC = () => {
    const [openEditDialog, setEditDialog] = useState<boolean>(false);

    return (
        <>
            <Button type={'text'} onClick={() => setEditDialog(true)}>Edit</Button>
            <Modal title="Sign in" open={openEditDialog} footer={null} onCancel={() => setEditDialog(true)}>

            </Modal>
        </>
    )
}
export default EditProduct;