'use client';
import React, {useEffect, useState} from "react";
import {Flex, Menu, MenuProps} from "antd";
import Sider from "antd/lib/layout/Sider";
import {
    HomeFilled, InfoCircleFilled, SettingFilled,
} from "@ant-design/icons";
import './styles/user-side-bar-left-menu.style.scss'
import {useSelector} from "react-redux";

type SideBarLeftMenuProps = {};
type LabelLinkProps = {
    title: string
    href: string
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: string
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem;
}

const LabelLink: React.FC<LabelLinkProps> = ({title, href}) => {
    return (
        <a href={href}>{title}</a>
    )
}

const menuItems: MenuItem[] = [
    getItem(<LabelLink title={'Settings'} href={'/user-management/useId=1'}/>,'setting' , <SettingFilled/>),
    getItem(<LabelLink title={'Help'} href={'/user-management/useId=1'}/>, 'help', <InfoCircleFilled/>),
];

const siderStyle: React.CSSProperties = {
    color: 'var(--white-color)',
    minHeight: '100vh',
    border: 'none',
    backgroundColor: 'var(--white-color)',
    padding: '0 1rem'
};

const UserSideBarLeftMenu: React.FC<SideBarLeftMenuProps> = () => {
    const activeItemMenu = useSelector((state: any) => state.layout.activeItemMenu);

    const [selectedKey, setSelectedKey] = useState('');

    useEffect(() => {
        setSelectedKey(activeItemMenu);
    }, [activeItemMenu])

    const handleChangeKey = (value: any) => {
        setSelectedKey(value.key);
    }
    return (
        <>
            <Sider width={'18%'} style={siderStyle}>
                <Flex gap={'middle'} className={'text-xl font-bold text-[--dark-blue-color] my-8 mx-2'}>
                    <HomeFilled/>
                </Flex>
                <Flex gap={"middle"} vertical justify={'space-between'} className={'custom-menu'}>
                    <Menu
                        style={{
                            borderInlineEnd: 'none',
                            backgroundColor: 'var(--white-color)',
                        }}
                        theme="light"
                        selectedKeys={[selectedKey]}
                        mode="inline"
                        items={menuItems}
                        onClick={handleChangeKey}
                    />
                </Flex>
            </Sider>
        </>
    )
}
export default UserSideBarLeftMenu