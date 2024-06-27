"use client";
import React, {useState} from "react";
import {Button, Col, Divider, Flex, Layout, Menu, MenuProps, Row} from "antd";
import {Header} from "antd/lib/layout/layout";
import {ShopFilled} from "@ant-design/icons";
import "./style.scss";
import SignInDialog from "@/app/(home)/dialog/sign-in";
import SignUpDialog from "@/app/(home)/dialog/sign-up";
import {signOut, useSession} from "next-auth/react";
import TopBar from "@/app/components/layout/TopBar";

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

const items: MenuItem[] = [
    getItem(null, null, null),
    getItem('Products', 'products', null, [
        getItem('Overview', 'Overview'),
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

const DesktopNavBar = () => {
    const {data: session} = useSession();
    const handleOpenSignOut = () => {
        signOut();
    }
    return (
        <Layout>
            <Header className={"flex sticky z-[1] top-0 bg-white nav-bar"}>
                <Row className={"w-[100%]"}>
                    <Col flex={'24px'}>
                        <ShopFilled className={"text-[24px]"}/>
                    </Col>
                    <Col flex={'auto'}>
                        <Menu mode='horizontal' items={items} style={{background: 'none', justifyContent: 'flex-end'}}/>
                    </Col>
                    <Col flex={'32px'}>
                        <Divider type={'vertical'} className={'ml-[24px]'}/>
                    </Col>
                    <Col flex={'none'}>
                        <Flex gap={'8px'} align={'center'} className={'h-[100%]'} justify={'flex-end'}>
                            {session ?
                                <Button type={'text'} onClick={handleOpenSignOut}>Sign out</Button> : (
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