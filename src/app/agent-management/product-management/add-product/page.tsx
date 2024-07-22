'use client';
import {FormProps} from "antd";
import {ProductItem} from "@/model/product/product";
import {createProduct} from "@/app/action/product";
import AdjustProductForm
    from "@/app/agent-management/product-management/component/adjust-product-form/adjust-product-form";
import {useAppDispatch, useAppSelector} from "@/lib/hook";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


const AddProduct = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const onFinish: FormProps<ProductItem>['onFinish'] = async (values: any) => {
        const dataSubmit = {
            name: values.name,
            description: values.description,
            image: values.image,
            quality: parseInt(values.quality),
            price: parseFloat(values.price),
            is_sale: values.is_sale,
            sale_price: parseFloat(values.sale_price),
        }
        const res = await dispatch(createProduct(dataSubmit));
        if(res.meta.requestStatus === 'fulfilled') {
            router.push('/agent-management/product-management/product-list')
        }
    };

    const onFinishFailed: FormProps<ProductItem>['onFinishFailed'] = (errorInfo) => {
        console.debug('Failed:', errorInfo);
    };

    return (
        <>
            <AdjustProductForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
        </>
    )
}
export default AddProduct