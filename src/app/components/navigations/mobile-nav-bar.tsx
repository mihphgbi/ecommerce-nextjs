"use client";
import React, {useState} from "react";
import Link from "next/link";
import {Button, Drawer, Flex, Layout, Menu} from "antd";
import {Header} from "antd/lib/layout/layout";
import {MenuOutlined, ShopFilled, UserOutlined} from "@ant-design/icons";
import {signOut, useSession} from "next-auth/react";
import SignInDialog from "@/app/(home)/dialog/sign-in";
import SignUpDialog from "@/app/(home)/dialog/sign-up";
import {navigationItems} from "@/app/components/navigations/desktop-nav-bar";
import "./style.scss";

const MobileNavBar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const {data: session} = useSession();
    const isAgent = (session?.user as any)?.isAgent === true || (session?.user as any)?.isAgent === 'true';
    const userInformationHref = session ? '/user-management/me' : '/sign-in';

    return(
        <Layout className={"mobile-nav"}>
            <Header className={"nav-bar mobile-nav-header bg-white"}>
                <Link href={"/"} className={"nav-logo"} aria-label={"Go to landing page"}>
                    <ShopFilled className={"text-[24px]"}/>
                </Link>
                <Button
                    type={"text"}
                    icon={<MenuOutlined/>}
                    aria-label={"Open menu"}
                    onClick={() => setOpen(true)}
                />
            </Header>
            <Drawer
                title={"Menu"}
                placement={"right"}
                open={open}
                onClose={() => setOpen(false)}
                width={300}
            >
                <Menu mode={"inline"} items={navigationItems} className={"mobile-nav-menu"}/>
                <div className={"mobile-nav-actions"}>
                    {session ? (
                        <Flex vertical gap={8}>
                            <Button icon={<UserOutlined/>} href={userInformationHref}>Information</Button>
                            {isAgent && (
                                <Button href={"/agent-management"} target={"_blank"} rel={"noreferrer"}>
                                    Agent Management
                                </Button>
                            )}
                            <Button type={"text"} onClick={() => signOut()}>Sign out</Button>
                        </Flex>
                    ) : (
                        <Flex vertical gap={8}>
                            <SignInDialog/>
                            <SignUpDialog/>
                        </Flex>
                    )}
                </div>
            </Drawer>
        </Layout>
    )
}
export default MobileNavBar;
