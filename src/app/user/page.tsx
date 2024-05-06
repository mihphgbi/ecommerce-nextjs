import React from "react";
import {Col} from "antd";
import Title from "antd/es/typography/Title";

export default function User() {
    return (
        <>
            <div className={'p-[48px]'}>
                <Col span={8}>
                    <div className={'p-[16px] border-solid border-[1px] border-gray-200 rounded-[8px]'}>
                        <Title level={4}>Filter by:</Title>
                    </div>
                </Col>
                <Col span={16}>

                </Col>
            </div>
        </>
    )
}