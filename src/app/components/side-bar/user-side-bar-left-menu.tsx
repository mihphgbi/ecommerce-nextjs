'use client';
import React, {useEffect, useState} from "react";
import {Flex, Menu, MenuProps} from "antd";
import Sider from "antd/lib/layout/Sider";
import {
    HomeFilled, InfoCircleFilled, SettingFilled,
} from "@ant-design/icons";
import './styles/user-side-bar-left-menu.style.scss'
import {useSelector} from "react-redux";
import {useSession} from "next-auth/react";

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

const siderStyle: React.CSSProperties = {
    color: 'var(--white-color)',
    minHeight: '100vh',
    border: 'none',
    backgroundColor: 'var(--white-color)',
    padding: '0 1rem'
};

const UserSideBarLeftMenu: React.FC<SideBarLeftMenuProps> = () => {
    const {data: session} = useSession();
    const activeItemMenu = useSelector((state: any) => state.layout.activeItemMenu);

    const [selectedKey, setSelectedKey] = useState('');
    const userInformationHref = session ? '/user-management/me' : '/sign-in';
    const menuItems: MenuItem[] = [
        getItem(<LabelLink title={'Information'} href={userInformationHref}/>, 'information', <InfoCircleFilled/>),
        getItem(<LabelLink title={'Settings'} href={userInformationHref}/>, 'setting', <SettingFilled/>),
    ];

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
