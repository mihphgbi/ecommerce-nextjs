'use client';
import ProductListTable from "@/app/agent-management/product-management/component/ table/product-list-table";
import {useEffect, useState} from "react";
import {getProductData} from "@/lib/redux/action/product";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hook";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const [products,setProducts] = useState([]);
    const isDelete = useAppSelector(state => state.products.isDelete);
    const productList = useAppSelector(state => state.products.productList);
    useEffect(() => {
         dispatch(getProductData());

    }, [isDelete]);
    useEffect(() => {
        if(productList?.length > 0) {
            setProducts(productList);
        }
    }, [productList]);
    return (
        <>
            <ProductListTable data={products}/>
        </>
    )
}
export default ProductList