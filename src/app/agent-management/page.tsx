'use client';
import {Button} from "antd";
import {useRouter} from "next/navigation";

const AgentManagement = () => {
    const router = useRouter();

    const directToAddProductPage = (name: string) => {
        switch (name) {
            case 'add':
                router.push('/agent-management/product-management/add-product');
                break;
            case 'list':
                router.push('/agent-management/product-management/product-list')
                break;
            default:
                router.push('/agent-management')
                break;
        }
    }
    return (
        <>
            <Button onClick={() => directToAddProductPage('add')}>Add Product Item</Button>
            <Button onClick={() => directToAddProductPage('list')}>List Product</Button>
        </>
    )
}
export default AgentManagement