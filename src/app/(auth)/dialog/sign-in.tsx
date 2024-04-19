"use client";
import {Modal} from "antd";

export default function SignInDialog(open: boolean, onClose: boolean) {
    const handleOk = () => {

    }
    return (
        <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={onClose}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}