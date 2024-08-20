'use client';
import React, {FC, ReactElement, ReactNode} from "react";
import Footer from "../../components/footer/footer";
import {Layout} from "antd";
import {Content} from "antd/lib/layout/layout";
import {useSelector} from "react-redux";
import ToastAlert from "../../components/toast/toast";
import UserSideBarLeftMenu from "@/app/components/side-bar/user-side-bar-left-menu";

interface LayoutProps {
    children: ReactNode;
    title: string
}

const UserManagementLayout: FC<LayoutProps> = ({children, title}): ReactElement => {
    const {alertStatus, isOpenAlert, msgAlert} = useSelector((state: any) => state.layout)

    return (
        <div className={'min-h-[100vh] min-w-[100%]'}>
            <Layout className={'flex-row'}>
                <UserSideBarLeftMenu/>
                <Layout className={'flex-col bg-white-color'}>
                    <Content className={'text-dark-blue-color bg-gray-color rounded-t-3xl p-8 '}>
                        {children}
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
            {
                isOpenAlert &&
				<ToastAlert  open={isOpenAlert} type={alertStatus} message={msgAlert} showIcon></ToastAlert>
            }
        </div>
    );
};

export default UserManagementLayout;
