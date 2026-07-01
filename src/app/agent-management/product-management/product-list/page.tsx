'use client';
import React, {useEffect, useState} from "react";
import {getProductData} from "@/lib/redux/action/product";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hook";
import ProductListTable from "@/app/agent-management/product-management/components/table/product-list-table";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const [products,setProducts] = useState([]);
    const isDelete = useAppSelector(state => state.products.isDelete);
    const productList = useAppSelector(state => state.products.productList);
    useEffect(() => {
         dispatch(getProductData({agent_only: true}));

    }, [dispatch, isDelete]);
    useEffect(() => {
        setProducts(productList || []);
    }, [productList]);
    return (
        <>
            <ProductListTable data={products}/>
        </>
    )
}
export default ProductList
