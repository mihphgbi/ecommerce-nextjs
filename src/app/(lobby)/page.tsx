import {Breadcrumb, Button, Layout, Menu, MenuProps} from "antd";
import {Content, Header} from "antd/lib/layout/layout";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import {DingdingOutlined} from "@ant-design/icons";
import React from "react";
import '../(lobby)/style.scss';
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
    getItem('Navigation One', 'sub1',null,[
        getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),

    getItem('Navigation Two', 'sub2', null,[
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('Navigation Three', 'sub4',null, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

export default function Lobby() {
    return (
        <Layout>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <div className="demo-logo flex-none w-[100px] h-[45px]">
                    <DingdingOutlined style={{ fontSize: '50px', color: '#CED1D6' }}/>
                </div>
                <div className="nav-bar grow">
                    <Menu mode='horizontal' items={items} style={{background:'none'}}/>
                </div>
                <div className="search-box flex-none">

                </div>
                <div className="sign-in flex-none">
                    <Button value={'default'} href={"/sign-in"}>Sign-in</Button>
                </div>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>List</BreadcrumbItem>
                    <BreadcrumbItem>App</BreadcrumbItem>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                    Content
                </div>
            </Content>
        </Layout>
    )
}