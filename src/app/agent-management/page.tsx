'use client';
import {Button} from "antd";
import {useRouter} from "next/navigation";

const AgentManagement = () => {
    const router = useRouter();
    const directToAddProductPage = () => {
        router.push('/agent-management/add-product')
    }
    return(
        <>
            <Button onClick={directToAddProductPage}>Add Product Item</Button>
        </>
    )
}
export default AgentManagement