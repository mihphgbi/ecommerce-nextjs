'use client';
import EditProduct from "@/app/agent-management/product-management/dialog/edit-product";
import DeleteProduct from "@/app/agent-management/product-management/dialog/delete-product";
import {Space, Table, TableProps} from "antd";

interface ListProduct {
    id: string;
    name: string;
    price: number;
    quality: number;
    description: string;
    is_sale: boolean;
    sale_price: number;
    image: string;
}


const columns: TableProps<ListProduct>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Quality',
        dataIndex: 'quality',
        key: 'quality',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
    },
    {
        title: 'Sale',
        dataIndex: 'is_sale',
        key: 'is_sale',
    },
    {
        title: 'Sale Price',
        dataIndex: 'sale_price',
        key: 'sale_price',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_,record) => {
            return (
                <Space size="middle">
                    <EditProduct/>
                    <DeleteProduct id={record.id}/>
                </Space>
            )
        }
    }
];
const ProductListTable = ({data}) => {
    return (
        <Table columns={columns} dataSource={data}/>
    )
}
export default ProductListTable