// src/app/components/navigations/top-bar.tsx
import React, {useEffect, useState} from "react";
import {Flex, Typography} from "antd";
import {CloseOutlined, NotificationFilled} from "@ant-design/icons";
import "./style.scss";


const TopBar = () => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('topbar-dismissed');
            if (stored === 'true') setDismissed(true);
        } catch (e) {
            // ignore if localStorage not available
        }
    }, []);

    const handleClose = () => {
        try {
            localStorage.setItem('topbar-dismissed', 'true');
        } catch (e) {
            // ignore
        }
        setDismissed(true);
    };

    if (dismissed) return null;

    return (
        <div className={'px-[24px] py-[8px] top-bar-bg'}>
            <Flex gap={'12px'}>
                <NotificationFilled/>
                <Flex flex={'auto'}>
                    <Typography className={'text-white'}>New update! New features available, bug fixes + more!</Typography>
                </Flex>
                <CloseOutlined onClick={handleClose} style={{cursor: 'pointer'}} role="button" aria-label="Close top bar"/>
            </Flex>
        </div>
    )
}
export default TopBar;