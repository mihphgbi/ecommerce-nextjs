'use client';
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";

import React, {useEffect, useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, PlusCircleOutlined, SettingFilled, ShoppingCartOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, MenuProps, Spin, theme} from 'antd';

const {Header, Sider, Content} = Layout;

const AgentManagementLayout = ({children}: { children: React.ReactNode }) => {
    const {data: session, status} = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const isAgent = (session?.user as any)?.isAgent === true || (session?.user as any)?.isAgent === 'true';
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const onClick: MenuProps['onClick'] = (e:any) => {
        const NAVIGATE_CONSTANT = {
            ['1']: '/agent-management/product-management/add-product',
            ['2']: '/agent-management/product-management/product-list',
            ['3']: '/agent-management/setting',
        }
        // @ts-ignore
        router.push(NAVIGATE_CONSTANT[e.key]);
    };
    const selectedKey = pathname.includes('/product-management/product-list')
        ? '2'
        : pathname.includes('/agent-management/setting')
            ? '3'
            : '1';

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        if (status === 'authenticated' && !isAgent) {
            router.replace('/');
        }
    }, [isAgent, pathname, router, status]);

    if (status === 'loading' || status === 'unauthenticated' || !isAgent) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <Layout style={{height: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{paddingTop: '3rem'}}>
                <div className="demo-logo-vertical"/>
                <div className="flex h-[calc(100vh-3rem)] flex-col justify-between">
                    <Menu
                        onClick={onClick}
                        theme="dark"
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        items={[
                            {
                                key: '1',
                                icon: <PlusCircleOutlined/>,
                                label: 'Add Product',
                            },
                            {
                                key: '2',
                                icon: <ShoppingCartOutlined/>,
                                label: 'Product List',
                            },
                        ]}
                    />
                    <Menu
                        onClick={onClick}
                        theme="dark"
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        items={[
                            {
                                key: '3',
                                icon: <SettingFilled/>,
                                label: 'Setting',
                            },
                        ]}
                    />
                </div>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AgentManagementLayout
