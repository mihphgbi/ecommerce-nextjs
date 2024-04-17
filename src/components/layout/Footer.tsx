"use client";
import React from "react";
import {Col, Divider, List, Row, Typography} from "antd";
import {ShopFilled} from "@ant-design/icons";
import "./style.scss";
import Item from "antd/lib/list/Item";

const shopList = ['Clothing', 'Shoes', 'Accessories', 'Brands', 'Sale', 'Gift Cards'];
const giftCardsList = ['Buy Gift Cards', 'About Gift Cards', 'Redeem a Gift Card', 'Corporate Gift Cards', 'Subscribe '];
const aboutStoreList = ['About us', 'Support', 'Accessories', 'Careers', 'Newsroom', 'Investors'];
const legalList = ['Legal Notice', 'Privacy Policy', 'Terms & Conditions'];

const Footer: React.FC = () => {
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
                            <List
                                header={<Typography className={'font-bold'}>Shop</Typography>}
                                bordered={false}
                                split={false}
                                dataSource={shopList}
                                renderItem={(item) => (
                                    <Item>
                                        <Typography mark>{item}</Typography>
                                    </Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <List
                                header={<Typography className={'font-bold'}>Gift Cards</Typography>}
                                bordered={false}
                                split={false}
                                dataSource={giftCardsList}
                                renderItem={(item) => (
                                    <Item>
                                        <Typography mark>{item}</Typography>
                                    </Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={12}>
                            <List
                                header={<Typography className={'font-bold'}>About Store</Typography>}
                                bordered={false}
                                split={false}
                                dataSource={aboutStoreList}
                                renderItem={(item) => (
                                    <Item>
                                        <Typography mark>{item}</Typography>
                                    </Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <List
                                header={<Typography className={'font-bold'}>Legal</Typography>}
                                bordered={false}
                                split={false}
                                dataSource={legalList}
                                renderItem={(item) => (
                                    <Item>
                                        <Typography mark={true}>{item}</Typography>
                                    </Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider className={'px-[48px]'}></Divider>
            <div>
                <Typography className={'text-center'}>© 2023 Company Name. All Rights Reserved.</Typography>
            </div>
        </div>
    )
}
export default Footer;