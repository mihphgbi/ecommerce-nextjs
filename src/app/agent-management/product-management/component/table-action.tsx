'use client';
import EditProduct from "@/app/agent-management/product-management/dialog/edit-product";
import DeleteProduct from "@/app/agent-management/product-management/dialog/delete-product";
import {Space} from "antd";

const TableAction = () => {
    return (
        <Space size="middle">
            <EditProduct/>
            <DeleteProduct id={'111111'}/>
        </Space>

    )
}
export default TableAction