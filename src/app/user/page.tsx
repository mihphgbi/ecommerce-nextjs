'use client';
import React, {useEffect, useState} from "react";
import {Badge, Button, Checkbox, Divider, Input, List, Switch, Typography} from "antd";
import Title from "antd/es/typography/Title";
import {HeartOutlined} from "@ant-design/icons";
import Item from "antd/es/list/Item";
import {ProductItem} from "@/model/product/product";

export default function User() {
    const {Text} = Typography;
    const [products, setProducts] = useState<ProductItem[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const response = await fetch('/api/products');

            if (!response.ok) {
                setProducts([]);
                return;
            }

            const result = await response.json();
            setProducts(result.data || []);
        }

        loadProducts();
    }, []);

    const onChange = () => {

    }
    return (
        <>
            <div className={'p-[48px] flex gap-[48px]'}>
                <div
                    className={'min-w-[253px] p-[16px] border-solid border-[1px] border-gray-200 rounded-[8px] gap-[16px] flex flex-col flex-wrap'}>
                    <div>
                        <Title level={4} className={'mb-0'}>Filter by:</Title>
                    </div>
                    <div>
                        <Divider className={'m-0'}/>
                    </div>
                    <div>
                        <Text strong>Your budget (per night)</Text>
                    </div>
                    <div className={'flex gap-[8px]'}>
                        <div>
                            <Switch defaultChecked onChange={onChange}/>
                        </div>
                        <div>
                            <Text>Set your own budget</Text>
                        </div>
                    </div>
                    <div>
                        <div className={'flex gap-[8px]'}>
                            <div>
                                <Checkbox onChange={onChange}></Checkbox>
                            </div>
                            <div>
                                <Text>$0 - $50</Text>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Divider className={'m-0'}/>
                    </div>
                    <div>
                        <Text strong>Popular filters</Text>
                    </div>
                    <div>
                        <div className={'flex gap-[8px]'}>
                            <div>
                                <Checkbox onChange={onChange}></Checkbox>
                            </div>
                            <div>
                                <Text>$0 - $50</Text>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Divider className={'m-0'}/>
                    </div>
                    <div>
                        <Text strong>Location</Text>
                    </div>
                    <div>
                        <div className={'flex gap-[8px]'}>
                            <Input placeholder="City"/>
                        </div>
                    </div>
                </div>
                <div>
                    <List
                        bordered={false}
                        split={false}
                        itemLayout="horizontal"
                        grid={{
                            gutter: 24,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 3,
                        }}
                        dataSource={products}
                        renderItem={(item) => (
                            <Item className={'mbe-0'}>
                                {
                                    item.is_sale ? (
                                        // <Space direction="vertical" size="middle" style={{width: '100%'}}>
                                        <Badge.Ribbon text="Discount" color="primary">
                                            <div>
                                                <div className={'w-[100%] h-[278px] bg-black'}>

                                                </div>
                                                <div className={'p-[16px] border-solid border-[1px] border-gray-200'}>
                                                    <div className={'pb-[4px]'}>
                                                        <Text strong>{item.name}</Text>
                                                    </div>
                                                    <div className={'pb-[8px]'}>
                                                        <Text>{item.description}</Text>
                                                    </div>
                                                    <div className={'flex gap-[4px] pb-[16px]'}>
                                                        <Text strong>${item.sale_price?.toFixed(2)}</Text>
                                                        <Text delete>${item.price?.toFixed(2)}</Text>
                                                    </div>
                                                    <div className={'flex gap-[8px]'}>
                                                        <Button className={'py-0 w-[200px]'}>Add to cart</Button>
                                                        <Button icon={<HeartOutlined/>}></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Badge.Ribbon>
                                        // </Space>
                                    ) : (
                                        <div>
                                            <div className={'w-[100%] h-[278px] bg-black'}>

                                            </div>
                                            <div className={'p-[16px] border-solid border-[1px] border-gray-200'}>
                                                <div className={'pb-[4px]'}>
                                                    <Text strong>{item.name}</Text>
                                                </div>
                                                <div className={'pb-[8px]'}>
                                                    <Text>{item.description}</Text>
                                                </div>
                                                <div className={'flex gap-[4px] pb-[16px]'}>
                                                    <Text strong>${item.price?.toFixed(2)}</Text>
                                                </div>
                                                <div className={'flex gap-[8px]'}>
                                                    <Button className={'py-0 w-[200px]'}>Add to cart</Button>
                                                    <Button icon={<HeartOutlined/>}></Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Item>
                        )}
                    />
                    <div className={'mt-[24px] text-center'}>
                        <Button className={'py-0 w-[200px]'}>Load more products</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
