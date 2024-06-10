'use client';
import React, {useState} from "react";
import {Button, Modal} from "antd";

const DeleteProduct : React.FC = () => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

    return (
        <>
            <Button type={'text'} onClick={() => setOpenDeleteDialog(true)}>Edit</Button>
            <Modal title="Sign in" open={openDeleteDialog} footer={null} onCancel={() => setOpenDeleteDialog(true)}>

            </Modal>
        </>
    )
}
export default DeleteProduct;