"use client";

import React, {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button, Col, Empty, Input, Pagination, Row, Select, Slider, Space, Tag, Typography} from "antd";
import Title from "antd/es/typography/Title";
import {AppstoreOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import ProductImage from "@/assets/pre-product-img.png";
import NavBar from "@/app/components/navigations/nav-bar";
import Footer from "@/app/components/footer/footer";
import {ProductItem, ProductType} from "@/model/product/product";
import "./style.scss";

const {Text, Paragraph} = Typography;
const PRODUCT_PAGE_SIZE = 8;

export default function ProductOverview() {
    const [selectedProductTypeId, setSelectedProductTypeId] = useState<string>();
    const [sortBy, setSortBy] = useState("featured");
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const selectedProductTypeName = productTypes.find((productType) => productType.id === selectedProductTypeId)?.name;

    useEffect(() => {
        const loadProducts = async () => {
            const searchParams = new URLSearchParams({
                page: page.toString(),
                limit: PRODUCT_PAGE_SIZE.toString(),
            });

            if (selectedProductTypeId) {
                searchParams.set("product_type_id", selectedProductTypeId);
            }

            const response = await fetch(`/api/products?${searchParams.toString()}`);

            if (!response.ok) {
                setProducts([]);
                setTotalProducts(0);
                return;
            }

            const result = await response.json();
            setProducts(result.data || []);
            setTotalProducts(result.pagination?.total || 0);
        }

        loadProducts();
    }, [page, selectedProductTypeId]);

    useEffect(() => {
        const loadProductTypes = async () => {
            const response = await fetch('/api/product-types');

            if (!response.ok) {
                setProductTypes([]);
                return;
            }

            const result = await response.json();
            setProductTypes(result.data || []);
        }

        loadProductTypes();
    }, []);

    const filteredProducts = useMemo(() => {
        return [...products].sort((firstProduct, secondProduct) => {
            const firstPrice = firstProduct.sale_price || firstProduct.price || 0;
            const secondPrice = secondProduct.sale_price || secondProduct.price || 0;

            if (sortBy === "price-low") {
                return firstPrice - secondPrice;
            }

            if (sortBy === "price-high") {
                return secondPrice - firstPrice;
            }

            return 0;
        });
    }, [products, sortBy]);

    const productTypeOptions = productTypes
        .filter((productType) => productType.id)
        .map((productType) => ({
            label: productType.name || "Unnamed type",
            value: productType.id || "",
        }));

    const sidebarProductTypeOptions = [
        {label: "All types", value: ""},
        ...productTypeOptions,
    ];

    return (
        <>
            <NavBar/>
            <main className={"product-overview-page"}>
                <section className={"product-overview-hero"}>
                    <Row gutter={[48, 32]} align={"middle"}>
                        <Col xs={24} lg={12}>
                            <div className={"product-overview-copy"}>
                                <Tag color={"blue"} className={"product-overview-kicker"}>New season edit</Tag>
                                <Title level={1}>Products designed for everyday momentum.</Title>
                                <Paragraph>
                                    Explore a curated selection of sneakers, carry goods, accessories, and home accents
                                    with sharp styling, practical details, and sale picks ready to ship.
                                </Paragraph>
                                <Space size={12} wrap>
                                    <Button type={"primary"} size={"large"} href={"#product-grid"}>Shop collection</Button>
                                    <Button size={"large"} href={"/"}>Back home</Button>
                                </Space>
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <div className={"product-overview-hero-media"}>
                                <Image src={ProductImage} alt={"Featured product collection"} fill priority sizes={"(max-width: 991px) 100vw, 50vw"}/>
                                <div className={"product-overview-hero-stat"}>
                                    <Text strong>24h</Text>
                                    <Text>fast dispatch</Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>

                <section className={"product-overview-toolbar"} aria-label={"Product filters"}>
                    <div className={"product-overview-search"}>
                        <Input size={"large"} prefix={<SearchOutlined/>} placeholder={"Search products"}/>
                    </div>
                    <div className={"product-overview-filter-group"}>
                        <Select
                            size={"large"}
                            value={selectedProductTypeId}
                            allowClear
                            placeholder={"All product types"}
                            onChange={(value) => {
                                setSelectedProductTypeId(value);
                                setPage(1);
                            }}
                            options={productTypeOptions}
                        />
                        <Select
                            size={"large"}
                            value={sortBy}
                            onChange={setSortBy}
                            options={[
                                {label: "Featured", value: "featured"},
                                {label: "Price: low to high", value: "price-low"},
                                {label: "Price: high to low", value: "price-high"},
                            ]}
                        />
                    </div>
                </section>

                <section className={"product-overview-content"} id={"product-grid"}>
                    <aside className={"product-overview-sidebar"} aria-label={"Refine products"}>
                        <div>
                            <Text strong>Product type</Text>
                            <div className={"product-overview-category-list"}>
                                {sidebarProductTypeOptions.map((productType) => (
                                    <Button
                                        key={productType.value}
                                        type={(selectedProductTypeId || "") === productType.value ? "primary" : "text"}
                                        onClick={() => {
                                            setSelectedProductTypeId(productType.value || undefined);
                                            setPage(1);
                                        }}
                                    >
                                        {productType.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Text strong>Price range</Text>
                            <Slider range defaultValue={[40, 180]} min={20} max={220}/>
                        </div>
                        <div className={"product-overview-support"}>
                            <AppstoreOutlined/>
                            <div>
                                <Text strong>Free returns</Text>
                                <Paragraph>Try your favorites at home with simple returns on every order.</Paragraph>
                            </div>
                        </div>
                    </aside>

                    <div className={"product-overview-grid"}>
                        <div className={"product-overview-results"}>
                            <Text strong>{totalProducts} {totalProducts === 1 ? "item" : "items"}</Text>
                            <Text type={"secondary"}>
                                {selectedProductTypeName ? `Showing ${selectedProductTypeName}` : "Showing all product types"}
                            </Text>
                        </div>
                        {filteredProducts.map((product) => {
                            const activePrice = product.sale_price || product.price || 0;

                            return (
                                <article className={"product-overview-card"} key={product.id}>
                                    <Link href={`/products/${product.id}`} className={"product-overview-card-media"}>
                                        <Image src={ProductImage} alt={product.name || "Product image"} fill sizes={"(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"}/>
                                        <Tag color={product.is_sale ? "red" : "blue"}>{product.is_sale ? "Sale" : "New"}</Tag>
                                    </Link>
                                    <div className={"product-overview-card-body"}>
                                        <div>
                                            <Text type={"secondary"}>{product.product_type?.name || "Uncategorized"}</Text>
                                            <Title level={4}>
                                                <Link href={`/products/${product.id}`}>{product.name}</Link>
                                            </Title>
                                        </div>
                                        <Paragraph>{product.description}</Paragraph>
                                        <div className={"product-overview-card-footer"}>
                                            <div>
                                                <Text strong>${activePrice.toFixed(2)}</Text>
                                                {product.is_sale && product.price && <Text delete>${product.price.toFixed(2)}</Text>}
                                            </div>
                                            <Text type={"secondary"}>{product.is_sale ? "Sale price" : "Regular price"}</Text>
                                        </div>
                                        <div className={"product-overview-card-actions"}>
                                            <Button type={"primary"} icon={<ShoppingCartOutlined/>}>Add</Button>
                                            <Button icon={<HeartOutlined/>} aria-label={`Save ${product.name || "product"}`}/>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                        {!filteredProducts.length && (
                            <Empty
                                className={"product-overview-empty"}
                                description={selectedProductTypeName ? `No products found for ${selectedProductTypeName}.` : "No products found."}
                            />
                        )}
                        {totalProducts > PRODUCT_PAGE_SIZE && (
                            <div className={"col-span-full flex justify-center"}>
                                <Pagination
                                    current={page}
                                    pageSize={PRODUCT_PAGE_SIZE}
                                    total={totalProducts}
                                    onChange={setPage}
                                    showSizeChanger={false}
                                />
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}
