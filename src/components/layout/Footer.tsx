import React from "react";
import {Col, Divider, Row, Typography} from "antd";
import {ShopFilled} from "@ant-design/icons";
import "./style.scss";
import Title from "antd/es/typography/Title";

const Footer = () => {
    return (
        <div className={"p-[48px]"}>
            <Row gutter={24}>
                <Col span={8}>
                    <div>
                        <ShopFilled className={"text-[24px]"}/>
                    </div>
                    <div>
                        <Typography>Quality materials, good designs, professional craftsmanship and
                            sustainability.</Typography>
                    </div>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={12}>
                            <Title>Shop</Title>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Divider className={'px-[48px]'}></Divider>
            <div>
                <Typography className={'text-center'}>© 2023 Company Name. All Rights Reserved.</Typography>
            </div>
        </div>
    )
}
export default Footer;