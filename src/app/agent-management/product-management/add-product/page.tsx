'use client';
import {FormProps} from "antd";
import {ProductItem} from "@/model/product/product";
import {createProduct} from "@/app/action/product";
import AdjustProductForm
    from "@/app/agent-management/product-management/component/adjust-product-form/adjust-product-form";

const onFinish: FormProps<ProductItem>['onFinish'] = (values) => {
    const dataSubmit = {
        name: values.name,
        description: values.description,
        image: values.image,
        quality: parseInt(values.quality),
        price: parseFloat(values.price),
        is_sale: values.is_sale,
        sale_price: parseFloat(values.sale_price),
    }
    createProduct(dataSubmit);
};

const onFinishFailed: FormProps<ProductItem>['onFinishFailed'] = (errorInfo) => {
    console.debug('Failed:', errorInfo);
};

const AddProduct = () => {
    return (
        <>
            <AdjustProductForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
        </>
    )
}
export default AddProduct