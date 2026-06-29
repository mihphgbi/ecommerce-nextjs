"use client";
import React from "react";
import Link from "next/link";
import {Button, Col, Divider, Dropdown, Flex, Layout, Menu, MenuProps, Row} from "antd";
import {Header} from "antd/lib/layout/layout";
import {ShopFilled, UserOutlined} from "@ant-design/icons";
import "./style.scss";
import SignInDialog from "@/app/(home)/dialog/sign-in";
import SignUpDialog from "@/app/(home)/dialog/sign-up";
import {signOut, useSession} from "next-auth/react";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const navigationItems: MenuItem[] = [
    getItem('Products', 'products', null, [
        getItem(<a href={'/products'}>Overview</a>, 'Overview'),
        getItem('Apps', 'Apps'),
        getItem('Templates', 'Templates'),
        getItem('Resources', 'Resources'),
        getItem('Libraries', 'Libraries'),
        getItem('Sales', 'Sales'),
    ]),
    getItem('Docs', 'docs', null),
    getItem('About us', 'aboutus', null),
    getItem('Pricing', 'pricing', null),
];

const userOption: MenuItem[] = [
    getItem(<a href={'/user-management/useId=1'}>Information</a>, 'information', null),
    getItem(<a href={'/user-management/useId=1'}>Setting</a>, 'setting', null),
];


const DesktopNavBar = () => {
    const {data: session} = useSession();

    const handleOpenSignOut = () => {
        signOut();
    }


    return (
        <Layout>
            <Header className={"desktop-nav flex sticky z-[1] top-0 bg-white nav-bar"}>
                <Row className={"w-[100%]"} align={'middle'}>
                    <Col flex={'24px'}>
                        <Link href={"/"} className={"nav-logo"} aria-label={"Go to landing page"}>
                            <ShopFilled className={"text-[24px]"}/>
                        </Link>
                    </Col>
                    <Col flex={'auto'}>
                        <Menu mode='horizontal' items={navigationItems} className={"desktop-nav-menu"} style={{background: 'none'}}/>
                    </Col>
                    <Col flex={'32px'}>
                        <Divider type={'vertical'} className={'ml-[24px]'}/>
                    </Col>
                    <Col flex={'none'}>
                        <Flex gap={'8px'} align={'center'} className={'h-[100%]'} justify={'flex-end'}>
                            {session ? (
                                <>
                                    <div>
                                        <Dropdown menu={{items: userOption}}>
                                            <Button icon={<UserOutlined/>} style={{border: 'none'}}/>
                                        </Dropdown>
                                    </div>
                                    <Button type={'text'} onClick={handleOpenSignOut}>Sign out</Button>
                                </>

                            ) : (
                                <>
                                    <SignInDialog/>
                                    <SignUpDialog/>
                                </>
                            )}
                        </Flex>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}
export default DesktopNavBar;
