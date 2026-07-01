"use client";
import React, {useEffect, useState} from "react";
import "./style.scss";
import Title from "antd/lib/typography/Title";
import {Button, Col, List, Row, Typography} from "antd";
import {CalendarTwoTone, GiftTwoTone, HomeTwoTone, InteractionTwoTone} from "@ant-design/icons";
import ProductItem from "../../assets/pre-product-img.png";
import Image from "next/image";
import Item from "antd/es/list/Item";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {ProductItem as ProductModel} from "@/model/product/product";

const collection = [
    {
        image: ProductItem,
        title: 'Home Delivery Available',
        text: 'Get your beauty products delivered straight to your door, saving you time and effort.'
    },
    {
        image: ProductItem,
        title: 'Home Decor Collection',
        text: 'Create a warm and inviting atmosphere in your home with our carefully curated selection of chic and timeless decor items.'
    },
    {
        image: ProductItem,
        title: 'Little Works of Art Collection',
        text: 'Transform your home into an art gallery with exquisite decor that adds a touch of creativity and uniqueness to your space.'
    },
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
    const {data: session} = useSession();
    const [saleProducts, setSaleProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const loadSaleProducts = async () => {
            const response = await fetch('/api/products?is_sale=true&sort_by=sold_items&limit=4');

            if (!response.ok) {
                setSaleProducts([]);
                return;
            }

            const result = await response.json();
            setSaleProducts(result.data || []);
        }

        loadSaleProducts();
    }, []);

    return (
        <>
            <div className='index-page-container'>
                <div className="panel-background">
                    <div className="panel-text">
                        <Title level={1} className={"text-center text-white"}>Explore Our Newest Cosmetic
                            Arrivals!</Title>
                        <Typography className={"text-center text-[16px] leading-[24px]"}>
                            Our latest cosmetic arrivals have just landed, and they are sure to dazzle you.
                            Check out the freshest makeup, skincare, beauty products and elevate your beauty routine.
                        </Typography>
                        {!session?.user &&
                            <div className={'text-center'}>
                                <Button type={'primary'} href={"/sign-in"} className={'text-center'}>Shop now</Button>
                            </div>
                        }
                    </div>
                </div>
                <div className="home-section">
                    <List
                        bordered={false}
                        split={false}
                        itemLayout="vertical"
                        grid={{gutter: [24, 24], xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
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
                <div className={"home-section"}>
                    <div className={'section-intro'}>
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
                            grid={{gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3}}
                            dataSource={collection}
                            renderItem={(item) => (
                                <Item className={'mbe-0'}>
                                    <div className={"collection-image relative"}>
                                        <Image src={item.image}
                                               style={{objectFit: "cover"}}
                                               loading="lazy"
                                               alt={'test'}
                                               fill={true}/>
                                    </div>
                                    <div className={'py-[16px]'}>
                                        <Typography
                                            className={'leading-[22px] font-bold text-[14px]'}>{item.title}</Typography>
                                        <Typography className={'text-[12px]'}>{item.text}</Typography>
                                    </div>
                                </Item>
                            )}
                        />
                    </div>
                </div>
                <div className={'home-section'}>
                    <Row gutter={[16, 8]} align={"middle"}>
                        <Col xs={24} sm={16}>
                            <Title level={3}>Similar Product</Title>
                        </Col>
                        <Col xs={24} sm={8}>
                            <div className={'similar-link'}>
                                <Link href={"/products"} className={'text-[#1677FF] underline'}>See everything </Link>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <List
                            bordered={false}
                            split={false}
                            itemLayout="vertical"
                            grid={{gutter: 24, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4}}
                            dataSource={saleProducts}
                            renderItem={(item) => (
                                <Item className={'mbe-0'}>
                                    <Link href={`/products/${item.id}`} className={'similar-product-card'}>
                                        <div className={"product-image relative"}>
                                            <Image src={ProductItem}
                                                   style={{objectFit: "cover"}}
                                                   loading="lazy"
                                                   alt={item.name || 'Sale product'}
                                                   fill={true}/>
                                        </div>
                                        <div className={'p-[16px] text-center'}>
                                            <Typography className={'text-[12px] leading-[20px]'}>{item.product_type?.name || 'Sale product'}</Typography>
                                            <Typography className={'text-14px leading-[22px]'}>{item.name}</Typography>
                                        </div>
                                        <div className={'text-center'}>
                                            <Typography
                                                className={'text-14px leading-[22px]'}>${(item.sale_price || item.price || 0).toFixed(2)} {item.sale_price ?
                                                <span
                                                    className={'text-[12px] text-[rgba(0, 0, 0, 0.45)] leading-[20px] line-through'}>${(item.price || 0).toFixed(2)}</span> : ''}</Typography>
                                        </div>
                                    </Link>
                                </Item>
                            )}
                        />
                    </div>
                </div>
                <div className={"promo-section home-section overflow-hidden"}>
                    <Row gutter={[48, 32]} align={"bottom"}>
                        <Col xs={24} lg={8} className={'promo-copy'}>
                            <div>
                                <div>
                                    <Typography className={"first-text"}>Final stock.</Typography>
                                    <Typography className={"second-text"}>Up to 50% off.</Typography>
                                </div>
                                <div>
                                    <Button size={'large'} type={'primary'} href={"/sign-in"}>Shop now</Button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={16}>
                            <Row gutter={[32, 32]}>
                                <Col xs={24} sm={12}>
                                    <Image alt={'test'} src={ProductItem} width={400} height={250}
                                           className={'promo-image rounded-[8px] promo-image-offset'}/>
                                    <Image alt={'test'} src={ProductItem} width={400} height={250}
                                           className={'promo-image rounded-[8px] mt-[32px]'}/>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Image alt={'test'} src={ProductItem} width={400} height={250}
                                           className={'promo-image rounded-[8px]'}/>
                                    <Image alt={'test'} src={ProductItem} width={400} height={250}
                                           className={'promo-image rounded-[8px] mt-[32px]'}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
