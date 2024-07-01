'use client';
import React, {useState} from "react";
import {Button, Modal} from "antd";
import {deleteProduct} from "@/app/action/product";

const DeleteProduct : React.FC = ({id}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const handleDelete = () => {
        deleteProduct(id);
        setOpenDeleteDialog(false);
    }
    return (
        <>
            <Button type={'text'} onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
            <Modal title="Are you sure?" open={openDeleteDialog} footer={null} onCancel={() => setOpenDeleteDialog(false)}>
                <Button onClick={handleDelete}>Confirm</Button>
                <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            </Modal>
        </>
    )
}
export default DeleteProduct;