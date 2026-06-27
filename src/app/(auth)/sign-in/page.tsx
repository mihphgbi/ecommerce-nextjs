"use client";
import SignInForm from "@/app/components/form/sign-in";
import { SignInFieldType } from "@/model/form/form";
import { FormProps } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { login } from "@/lib/redux/action/auth";
import { useAppDispatch } from "@/lib/redux/hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log("======", session);
  }, []);
  const onFinish: FormProps<SignInFieldType>["onFinish"] = async (values) => {
    try {
      // unwrap will throw if the thunk was rejected
      await dispatch(login(values)).unwrap();
      // on success, navigate to main page
      router.push("/");
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

