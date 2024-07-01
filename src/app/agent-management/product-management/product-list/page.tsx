'use client';
import ProductListTable from "@/app/agent-management/product-management/component/ table/product-list-table";
import {useEffect, useState} from "react";
import {getProductData} from "@/app/action/product";

const ProductList: React.FC = () => {
    const [products,setProducts] = useState([]);
    useEffect(() => {
        async function fetchProducts() {
            const productsData = await getProductData();
            setProducts(productsData);
        }
        fetchProducts()
    }, []);

    return (
        <>
            <ProductListTable data={products}/>
        </>
    )
}
export default ProductList