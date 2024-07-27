'use client';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, PlusCircleOutlined, ShoppingCartOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, MenuProps, theme} from 'antd';

const {Header, Sider, Content} = Layout;

const AgentManagementLayout = ({children}: { children: React.ReactNode }) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const onClick: MenuProps['onClick'] = (e) => {
        const NAVIGATE_CONSTANT = {
            [1]: '/agent-management/product-management/add-product',
            [2]: '/agent-management/product-management/product-list'
        }
        router.push(NAVIGATE_CONSTANT[e.key]);
    };
    if (session) {
        return (
            <Layout style={{height: '100vh'}}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{paddingTop: '3rem'}}>
                    <div className="demo-logo-vertical"/>
                    <Menu
                        onClick={onClick}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
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
    }
};

export default AgentManagementLayout