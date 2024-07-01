import SignInForm from "@/app/components/form/sign-in";
import {SignInFieldType} from "@/model/form/form";
import {FormProps} from "antd";

const SignInPage = () => {
    const onFinish: FormProps<SignInFieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<SignInFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
        </>
    )
}
export default SignInPage