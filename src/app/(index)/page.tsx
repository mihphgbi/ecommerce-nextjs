import React from "react";
import "./style.scss";
import Title from "antd/lib/typography/Title";
import {Button, Col, Row, Typography} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import ProductItem from "../../assets/pre-product-img.png";
import Image from "next/image";

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
                    <Row gutter={[48, 48]}>
                        <Col span={12}>
                            <Row className="incentive-item gap-[24px]">
                                <Col>
                                    <HomeOutlined className={"text-[24px]"}/>
                                </Col>
                                <Col>
                                    <Title level={4}>Home Delivery Available</Title>
                                    <Typography>Get your beauty products delivered straight to your door, saving you
                                        time and effort.</Typography>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className="incentive-item gap-[24px]">
                                <Col>
                                    <HomeOutlined className={"text-[24px]"}/>
                                </Col>
                                <Col>
                                    <Title level={4}>Home Delivery Available</Title>
                                    <Typography>Get your beauty products delivered straight to your door, saving you
                                        time and effort.</Typography>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={12}>
                            <Row className="incentive-item gap-[24px]">
                                <Col>
                                    <HomeOutlined className={"text-[24px]"}/>
                                </Col>
                                <Col>
                                    <Title level={4}>Home Delivery Available</Title>
                                    <Typography>Get your beauty products delivered straight to your door, saving you
                                        time and effort.</Typography>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className="incentive-item gap-[24px]">
                                <Col>
                                    <HomeOutlined className={"text-[24px]"}/>
                                </Col>
                                <Col>
                                    <Title level={4}>Home Delivery Available</Title>
                                    <Typography>Get your beauty products delivered straight to your door, saving you
                                        time and effort.</Typography>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className={"p-[48px]"}>
                    <div className={'w-[573px]'}>
                        <Title level={3}>Shop by Collection</Title>
                        <Typography>
                            Discover a carefully curated selection of unique and stylish products. From trendy
                            fashion pieces to timeless home decor, our collections offer a wide range of items
                            that
                            are handpicked to suit your taste and style.
                        </Typography>
                    </div>
                    <Row gutter={24}>
                        <Col span={8} >
                            <Image src={ProductItem} width={300} height={300}/>
                            <div className={'p-[16px]'}>
                                <Typography>Trendy Fashion Collection</Typography>
                                <Typography>Stay on-trend with our modern and stylish home decor pieces that
                                    effortlessly elevate your home's aesthetics.</Typography>
                            </div>
                        </Col>
                        <Col span={8} >
                            <Image src={ProductItem} width={300} height={300}/>
                            <div className={'p-[16px]'}>
                                <Typography>Trendy Fashion Collection</Typography>
                                <Typography>Stay on-trend with our modern and stylish home decor pieces that
                                    effortlessly elevate your home's aesthetics.</Typography>
                            </div>
                        </Col>
                        <Col span={8} >
                            <Image src={ProductItem} width={300} height={300}/>
                            <div className={'p-[16px]'}>
                                <Typography>Trendy Fashion Collection</Typography>
                                <Typography>Stay on-trend with our modern and stylish home decor pieces that
                                    effortlessly elevate your home's aesthetics.</Typography>
                            </div>
                        </Col>
                    </Row>
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
                    <Row gutter={24}>
                        <Col span={6}>
                            <Image src={ProductItem} width={270} height={270}/>
                            <div className={'p-[16px]'}>
                                <Typography>Kicks & Carriers</Typography>
                                <Typography>Low-top sneakers</Typography>
                            </div>
                            <div>
                                <Typography>$129.99 <span>$189.99</span></Typography>
                            </div>
                        </Col>
                        <Col span={6}>
                            <Image src={ProductItem} width={270} height={270}/>
                            <div className={'p-[16px]'}>
                                <Typography>Kicks & Carriers</Typography>
                                <Typography>Low-top sneakers</Typography>
                            </div>
                            <div>
                                <Typography>$129.99 <span>$189.99</span></Typography>
                            </div>
                        </Col>
                        <Col span={6}>
                            <Image src={ProductItem} width={270} height={270}/>
                            <div className={'p-[16px]'}>
                                <Typography>Kicks & Carriers</Typography>
                                <Typography>Low-top sneakers</Typography>
                            </div>
                            <div>
                                <Typography>$129.99 <span>$189.99</span></Typography>
                            </div>
                        </Col>
                        <Col span={6}>
                            <Image src={ProductItem} width={270} height={270}/>
                            <div className={'p-[16px]'}>
                                <Typography>Kicks & Carriers</Typography>
                                <Typography>Low-top sneakers</Typography>
                            </div>
                            <div>
                                <Typography>$129.99 <span>$189.99</span></Typography>
                            </div>
                        </Col>
                    </Row>
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