'use client';
import React, {useState} from "react";
import {Button, Modal} from "antd";
import {useAppDispatch} from "@/lib/hook";
import {deleteProduct} from "@/app/action/product";

interface DeleteProductProps {
    id?: string
}

const DeleteProduct: React.FC<DeleteProductProps> = ({id}) => {
    const dispatch = useAppDispatch();
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const handleDelete = () => {
        dispatch(deleteProduct(id));
        setOpenDeleteDialog(false);
    }
    return (
        <>
            <Button type={'text'} onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
            <Modal title="Are you sure?" open={openDeleteDialog} footer={null}
                   onCancel={() => setOpenDeleteDialog(false)}>
                <Button onClick={handleDelete}>Confirm</Button>
                <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            </Modal>
        </>
    )
}
export default DeleteProduct;