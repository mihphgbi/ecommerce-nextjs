"use client";
import React, {useState} from "react";
import {Button, Col, Divider, Flex, Layout, Menu, MenuProps, Row} from "antd";
import {Header} from "antd/lib/layout/layout";
import {ShopFilled} from "@ant-design/icons";
import "../layout/style.scss";
import SignInDialog from "@/app/(auth)/dialog/sign-in";

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
    const [openSignInPopup, setOpenSignInPopup] = useState(false);
    const handleOpenSignInPopup = () => {
        setOpenSignInPopup(true);
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
                            <Button type={'text'} onClick={handleOpenSignInPopup}>Sign in</Button>
                            <Button type={'primary'} href={"/sign-up"}>Sign up</Button>
                        </Flex>
                    </Col>
                </Row>
            </Header>
            {openSignInPopup && <SignInDialog open={openSignInPopup} onClose={() => setOpenSignInPopup(false)}/>}
        </Layout>
    )
}
export default DesktopNavBar;