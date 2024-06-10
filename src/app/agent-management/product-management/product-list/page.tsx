import {Space, Table, TableProps} from "antd";
import prisma from "@/lib/db/prisma";
import EditProduct from "@/app/agent-management/product-management/dialog/edit-product";
import DeleteProduct from "@/app/agent-management/product-management/dialog/delete-product";

interface ListProduct {
    key: string;
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
        render: () => (
            <Space size="middle">
                <EditProduct/>
                <DeleteProduct/>
            </Space>
        ),
    }
];

const ProductList: React.FC = async () => {
    const res = await prisma.product.findMany();

    return (
        <>
            <Table columns={columns} dataSource={res}/>;
        </>
    )
}
export default ProductList