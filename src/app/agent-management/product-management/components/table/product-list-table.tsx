'use client';
import {Space, Table, TableProps} from "antd";
import EditProduct from "@/app/agent-management/product-management/dialogs/edit-product";
import DeleteProduct from "@/app/agent-management/product-management/dialogs/delete-product";

interface ListProduct {
    id: string;
    name: string;
    price: number;
    quality: number;
    sold_items: number;
    description: string;
    is_sale: boolean;
    sale_price: number;
    image: string;
    product_type?: {
        name?: string;
    };
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
        title: 'Sold Items',
        dataIndex: 'sold_items',
        key: 'sold_items',
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
        title: 'Type',
        dataIndex: ['product_type', 'name'],
        key: 'product_type',
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
                    <EditProduct record={record}/>
                    <DeleteProduct id={record.id}/>
                </Space>
            )
        }
    }
];
const ProductListTable = ({data}: {data: ListProduct[]}) => {
    return (
        <Table columns={columns} dataSource={data} rowKey="id"/>
    )
}
export default ProductListTable
