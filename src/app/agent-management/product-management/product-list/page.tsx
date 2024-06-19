import {Table, TableProps} from "antd";
import prisma from "@/lib/db/prisma";
import TableAction from "@/app/agent-management/product-management/component/table-action";
import ProductListTable from "@/app/agent-management/product-management/component/table-action";



const ProductList: React.FC = async () => {
    const res = await prisma.product.findMany();

    return (
        <>
            <ProductListTable data={res}/>
        </>
    )
}
export default ProductList