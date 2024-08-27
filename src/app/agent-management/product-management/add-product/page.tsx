'use client';
import {FormProps} from "antd";
import {ProductItem} from "@/model/product/product";
import {createProduct} from "@/lib/redux/action/product";
import {useAppDispatch} from "@/lib/redux/hook";
import {useRouter} from "next/navigation";
import AdjustProductForm
    from "@/app/agent-management/product-management/components/adjust-product-form/adjust-product-form";


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
        // @ts-ignore
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
            <AdjustProductForm fields={null} onFinish={onFinish} onFinishFailed={onFinishFailed}/>
        </>
    )
}
export default AddProduct