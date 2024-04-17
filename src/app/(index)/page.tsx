"use client";
import React from "react";
import "./style.scss";
import Title from "antd/lib/typography/Title";
import {Button, Col, List, Row, Typography} from "antd";
import {CalendarTwoTone, GiftTwoTone, HomeTwoTone, InteractionTwoTone} from "@ant-design/icons";
import ProductItem from "../../assets/pre-product-img.png";
import Image from "next/image";
import Item from "antd/es/list/Item";

const collection = [
    {image: ProductItem},
    {image: ProductItem},
    {image: ProductItem},
]
const similarProductList = [
    {image: ProductItem},
    {image: ProductItem},
    {image: ProductItem},
    {image: ProductItem},
]
const incentivesList = [
    {
        image: <HomeTwoTone className={"text-[24px]"}/>,
        title: 'Home Delivery Available',
        text: 'Get your beauty products delivered straight to your door, saving you time and effort.'
    },
    {
        image: <CalendarTwoTone className={"text-[24px]"}/>,
        title: '3-year warranty',
        text: 'Feel confident with our 3-year warranty on beauty products, providing you with peace of mind and protection against potential defects or issues.'
    },
    {
        image: <InteractionTwoTone className={"text-[24px]"}/>,
        title: 'Free shipping on returns',
        text: 'Enjoy the convenience of free shipping on returns, making the return process easy and convenient for you.'
    },
    {
        image: <GiftTwoTone className={"text-[24px]"}/>,
        title: '15% off for our loyal customer',
        text: 'Sign up for our newsletter and stay in the loop! Get exclusive discounts, product updates, and special offers delivered straight to your inbox.'
    },
]
export default function Index() {
    return (
        <>
            <div className='index-page-container'>
                <div className="panel-background">
                    <div className="panel-text">
                        <Title level={1} className={"text-center text-white"}>Explore Our Newest Cosmetic
                            Arrivals!</Title>
                        <Typography className={"text-center text-[16px] leading-[24px]"}>
                            Our latest cosmetic arrivals have just landed, and they're sure to dazzle you.
                            Check out the freshest makeup, skincare, beauty products and elevate your beauty routine.
                        </Typography>
                        <div className={'text-center'}>
                            <Button type={'primary'} href={"/sign-in"} className={'text-center'}>Shop now</Button>
                        </div>
                    </div>
                </div>
                <div className="p-[48px]">
                    <List
                        bordered={false}
                        split={false}
                        itemLayout="vertical"
                        grid={{gutter: [48, 48], column: 2}}
                        dataSource={incentivesList}
                        renderItem={(item) => (
                            <Item className={'mbe-0'}>
                                <Row className="gap-[24px] flex-nowrap">
                                    <Col>
                                        {item.image}
                                    </Col>
                                    <Col>
                                        <Title level={4} className={'mb-[8px]'}>{item.title}</Title>
                                        <Typography
                                            className={'text-[14px] leading-[22px] text-[rgba(0, 0, 0, 0.65)]'}>{item.text}</Typography>
                                    </Col>
                                </Row>
                            </Item>
                        )}
                    />
                </div>
                <div className={"p-[48px]"}>
                    <div className={'w-[573px] pb-[32px]'}>
                        <Title level={3}>Shop by Collection</Title>
                        <Typography>
                            Discover a carefully curated selection of unique and stylish products. From trendy
                            fashion pieces to timeless home decor, our collections offer a wide range of items
                            that
                            are handpicked to suit your taste and style.
                        </Typography>
                    </div>
                    <div>
                        <List
                            bordered={false}
                            split={false}
                            itemLayout="vertical"
                            grid={{gutter: 24, column: 3}}
                            dataSource={collection}
                            renderItem={(item) => (
                                <Item className={'mbe-0'}>
                                    <Image src={item.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                                    <div className={'py-[16px]'}>
                                        <Typography className={'leading-[22px] font-bold text-[14px]'}>Trendy Fashion Collection</Typography>
                                        <Typography className={'text-[12px]'}>Stay on-trend with our modern and stylish home decor pieces that
                                            effortlessly elevate your home's aesthetics.</Typography>
                                    </div>
                                </Item>
                            )}
                        />
                    </div>
                </div>
                <div className={'p-[48px]'}>
                    <Row>
                        <Col span={16}>
                            <Title level={3}>Similar Product</Title>
                        </Col>
                        <Col span={8}>
                            <div className={'flex justify-end'}>
                                <Typography>See everything </Typography>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <List
                            bordered={false}
                            split={false}
                            itemLayout="vertical"
                            grid={{gutter: 24, column: 4}}
                            dataSource={similarProductList}
                            renderItem={(item) => (
                                <Item className={'mbe-0'}>
                                    <Image src={item.image} width={270} height={270}/>
                                    <div className={'p-[16px]'}>
                                        <Typography>Kicks & Carriers</Typography>
                                        <Typography>Low-top sneakers</Typography>
                                    </div>
                                    <div>
                                        <Typography>$129.99 <span>$189.99</span></Typography>
                                    </div>
                                </Item>
                            )}
                        />
                    </div>
                </div>
                <div className={"promo-section h-[612px] p-[48px]"}>
                    <Row gutter={48}>
                        <Col span={8}>
                            <div>
                                <Title level={1}>Final stock. Up to 50% off.</Title>
                            </div>
                            <div>
                                <Button type={'primary'} href={"/sign-in"}>Shop now</Button>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Row gutter={32}>
                                <Col span={12}>
                                    <Image src={ProductItem} width={470} height={270}/>
                                </Col>
                                <Col span={12}>
                                    <Image src={ProductItem} width={470} height={270}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}