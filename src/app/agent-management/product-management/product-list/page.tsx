import { Table, TableProps} from "antd";
import prisma from "@/lib/db/prisma";
interface ListProduct {
    key: string;
    name: string;
    price: number;
    quality: string;
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
];



const ProductList: React.FC = async () => {
    const res = await prisma.product.findMany();

    return (
        <>
            <Table columns={columns} dataSource={res} />;
        </>
    )
}
export default ProductList