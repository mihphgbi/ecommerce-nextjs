"use client";
import SignInForm from "@/app/components/form/sign-in";
import { SignInFieldType } from "@/model/form/form";
import { FormProps } from "antd";
import Link from "next/link";
import { login } from "@/lib/redux/action/auth";
import { useAppDispatch } from "@/lib/redux/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(params.get("callbackUrl") || "/");
  }, []);
  const onFinish: FormProps<SignInFieldType>["onFinish"] = async (values) => {
    try {
      // unwrap will throw if the thunk was rejected
      await dispatch(login(values)).unwrap();
      router.push(callbackUrl);
    } catch (err) {
      // error handling handled by thunk (alerts). Keep here if you want to add extra UI handling
      console.log("login failed", err);
    }
  };

  const onFinishFailed: FormProps<SignInFieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={"form-wrapper"}>
      <SignInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      <p>
        Do not have an account?{" "}
        <Link href={"/sign-up"} className={"text-blue-600"}>
          Sign up
        </Link>
      </p>
    </div>
  );
};
export default SignInPage;

