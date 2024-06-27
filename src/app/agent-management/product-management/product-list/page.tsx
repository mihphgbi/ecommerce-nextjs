'use client';
import ProductListTable from "@/app/agent-management/product-management/component/ table/product-list-table";
import {useEffect, useState} from "react";
import {getProductData} from "@/action/product";



const ProductList: React.FC = async () => {
    const [res,setRes] = useState([]);
    // const res = await prisma.product.findMany();
    useEffect(() => {
        let temp =  getProductData() || []
        setRes(temp);
    },[])

    return (
        <>
            <ProductListTable data={res}/>
        </>
    )
}
export default ProductList