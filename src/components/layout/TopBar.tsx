import React from "react";
import {Flex, Typography} from "antd";
import {CloseOutlined, NotificationFilled} from "@ant-design/icons";
import "./style.scss";

const TopBar = () => {
    return (
        <div className={'px-[24px] py-[8px] top-bar-bg'}>
            <Flex gap={'12px'}>
                <NotificationFilled/>
                <Flex flex={'auto'}>
                    <Typography className={'text-white'}>New update! New features available, bug fixes + more!</Typography>
                </Flex>
                <CloseOutlined/>
            </Flex>
        </div>
    )
}
export default TopBar;