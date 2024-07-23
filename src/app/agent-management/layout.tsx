'use client';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const AgentManagementLayout = ({children}: {children: React.ReactNode}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            {
                !session ? (
                    <Layout style={{height: '100%'}}>
                        <Sider trigger={null} collapsible collapsed={collapsed}>
                            <div className="demo-logo-vertical" />
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                items={[
                                    {
                                        key: '1',
                                        icon: <UserOutlined />,
                                        label: 'Product Management',
                                    },
                                    {
                                        key: '2',
                                        icon: <UserOutlined />,
                                        label: 'Information',
                                    },
                                ]}
                            />
                        </Sider>
                        <Layout>
                            <Header style={{ padding: 0, background: colorBgContainer }}>
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
                ) : router.push('/')
            }
        </>
    );
};

export default AgentManagementLayout