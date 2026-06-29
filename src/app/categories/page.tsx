"use client";

import React from "react";
import Link from "next/link";
import {Button, Col, List, Row, Space, Typography} from "antd";
import Title from "antd/es/typography/Title";
import {
    AppstoreOutlined,
    GiftOutlined,
    HomeOutlined,
    ShoppingOutlined,
    SkinOutlined,
    TagsOutlined
} from "@ant-design/icons";
import NavBar from "@/app/components/navigations/nav-bar";
import Footer from "@/app/components/footer/footer";
import "./style.scss";

const {Paragraph, Text} = Typography;

const categories = [
    {
        icon: <SkinOutlined/>,
        name: "Sneakers",
        productCount: 24,
        description: "Low-tops, high-tops, and everyday pairs built for clean daily styling.",
        href: "/products",
    },
    {
        icon: <ShoppingOutlined/>,
        name: "Bags",
        productCount: 18,
        description: "Compact packs, structured carry goods, and roomy weekend-ready bags.",
        href: "/products",
    },
    {
        icon: <GiftOutlined/>,
        name: "Accessories",
        productCount: 31,
        description: "Finishing pieces, small essentials, and giftable details for any look.",
        href: "/products",
    },
    {
        icon: <HomeOutlined/>,
        name: "Home",
        productCount: 16,
        description: "Decor accents and home edits selected for warm, simple spaces.",
        href: "/products",
    },
    {
        icon: <AppstoreOutlined/>,
        name: "Sale",
        productCount: 12,
        description: "Limited-time markdowns across customer favorites and final stock.",
        href: "/products",
    },
    {
        icon: <TagsOutlined/>,
        name: "New Arrivals",
        productCount: 20,
        description: "Freshly added products from the latest seasonal edit.",
        href: "/products",
    },
];

export default function CategoryPage() {
    return (
        <>
            <NavBar/>
            <main className={"category-page"}>
                <section className={"category-hero"}>
                    <Row gutter={[40, 24]} align={"middle"}>
                        <Col xs={24} lg={15}>
                            <Text className={"category-kicker"}>Category directory</Text>
                            <Title level={1}>Shop by category</Title>
                            <Paragraph>
                                Explore every product family in one place, then jump into the collection that best fits
                                what you are looking for today.
                            </Paragraph>
                        </Col>
                        <Col xs={24} lg={9}>
                            <div className={"category-summary"}>
                                <Text strong>{categories.length}</Text>
                                <Text>active categories</Text>
                            </div>
                        </Col>
                    </Row>
                </section>

                <section className={"category-list-section"}>
                    <div className={"category-list-heading"}>
                        <Title level={3}>All categories</Title>
                        <Button href={"/products"}>View products</Button>
                    </div>
                    <List
                        bordered={false}
                        split={false}
                        itemLayout="vertical"
                        grid={{gutter: 20, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3}}
                        dataSource={categories}
                        renderItem={(category) => (
                            <List.Item className={"mbe-0"}>
                                <Link href={category.href} className={"category-card"}>
                                    <span className={"category-card-icon"}>{category.icon}</span>
                                    <div className={"category-card-body"}>
                                        <div>
                                            <Title level={4}>{category.name}</Title>
                                            <Text type={"secondary"}>{category.productCount} products</Text>
                                        </div>
                                        <Paragraph>{category.description}</Paragraph>
                                        <Space className={"category-card-action"}>
                                            <Text>Browse category</Text>
                                        </Space>
                                    </div>
                                </Link>
                            </List.Item>
                        )}
                    />
                </section>
            </main>
            <Footer/>
        </>
    );
}
