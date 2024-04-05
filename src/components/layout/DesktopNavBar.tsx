import React from "react";
import {Button, Layout, Menu, MenuProps} from "antd";
import {Content, Header} from "antd/lib/layout/layout";
import {DingdingOutlined} from "@ant-design/icons";
import "../layout/style.scss";

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
    getItem('Categories', 'categories', null,[
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('test', 'sub4',null, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
    getItem('Blog', 'blog',null)
];

const DesktopNavBar = () => {
    return(
        <Layout>
            <Header className={"flex sticky z-[1] top-0 bg-blue-50"}>
                <div className="demo-logo flex">
                    <DingdingOutlined className={"text-[50px] text-blue-950"}/>
                    Blare
                </div>
                <div className="nav-bar flex-grow pl-4">
                    <Menu mode='horizontal' items={items} style={{background:'none', border: 'none'}}/>
                </div>
                <div className="search-box">

                </div>
                <div className="sign-in">
                    <Button value={'default'} href={"/sign-in"}>Sign-in</Button>
                </div>
            </Header>
        </Layout>
    )
}
export default DesktopNavBar;