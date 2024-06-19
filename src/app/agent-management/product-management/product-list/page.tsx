import prisma from "@/lib/db/prisma";
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