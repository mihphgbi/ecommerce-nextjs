'use client';
import React, {useState} from "react";
import {Breadcrumb, Button, Col, Divider, Image, Input, List, Row, Select, Typography} from "antd";
import Title from "antd/es/typography/Title";
import "../[productId]/style/product-detail.scss";
import {HeartOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import Item from "antd/es/list/Item";
import {ProductData} from "@/api/products/product-data";

export default function ProductDetail() {
    const {Text, Paragraph} = Typography;
    const [valueColor, setValueColor] = useState('white')
    const handleChange = (value: string) => {
        setValueColor(value)
    }
    return (
        <>
            {/*START-PRODUCT DETAIL*/}
            <div className={'p-[48px]'}>
                <div className={'flex gap-[48px]'}>
                    <div className={'w-[100%] h-[656px]'}>

                    </div>

                    <div className={'max-w-[480px]'}>
                        <div>
                            <Breadcrumb
                                items={[
                                    {
                                        title: 'Men',
                                    },
                                    {
                                        title: <a href="">Clothing</a>,
                                    },
                                    {
                                        title: <a href="">T-shirt</a>,
                                    },
                                ]}/>
                        </div>

                        <div className={'pt-[24px] pb-[4px]'}>
                            <Text>Noname brand</Text>
                        </div>

                        <div>
                            <Title level={2} className={'mb-[0]'}>Classic T-shirt</Title>
                        </div>

                        <div className={'pt-[16px] flex justify-between'}>
                            <div className={'flex gap-[8px]'}>
                                <Text strong className={'text-[20px]'}>$99.99</Text>
                                <Text delete className={'pt-[6px] text-[14px]'}>$199.99</Text>
                            </div>
                            <div className={'flex gap-[4px]'}>
                                <Text strong>4.8</Text>
                                <Text underline>(See all 32 reviews)</Text>
                            </div>
                        </div>

                        <div className={'py-[24px]'}>
                            <Divider className={'m-0'}/>
                        </div>

                        <div>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <div className={'pb-[8px]'}>
                                        <Text>Color</Text>
                                    </div>
                                    <div>
                                        <Select
                                            defaultValue='white'
                                            onChange={handleChange}
                                            style={{width: '100%'}}
                                            options={[
                                                {value: 'red', label: 'Red'},
                                                {value: 'white', label: 'White'},
                                                {value: 'black', label: 'Black'},
                                                {value: 'blue', label: 'Blue', disabled: true},
                                            ]}
                                        />
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className={'pb-[8px] flex gap-[5px]'}>
                                        <Text>Size</Text>
                                        <QuestionCircleOutlined/>
                                    </div>
                                    <div>
                                        <Select
                                            defaultValue='S'
                                            style={{width: '100%'}}
                                            onChange={handleChange}
                                            options={[
                                                {value: 's', label: 'S'},
                                                {value: 'm', label: 'M'},
                                                {value: 'l', label: 'L'},
                                                {value: 'xl', label: 'XL'},
                                            ]}
                                        />
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className={'pb-[8px] flex gap-[5px]'}>
                                        <Text>Quality</Text>
                                    </div>
                                    <div>
                                        <Input placeholder="10"/>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className={'flex gap-[8px] center pt-[24px]'}>
                            <Button size={'large'} type={'primary'} style={{width: '100%'}}>Add to cart</Button>
                            <Button size={'large'} icon={<HeartOutlined/>}></Button>
                        </div>

                        <div className={'py-[24px]'}>
                            <Divider className={'m-0'}/>
                        </div>

                        <div>
                            <div className={'pb-[12px]'}>
                                <Title level={5}>Features</Title>
                            </div>
                            <div>
                                <Paragraph type="secondary">
                                    <ul>
                                        <li>100% Cotton</li>
                                        <li>Care instructions: Do not tumble dry, machine wash at 30°C</li>
                                        <li>Neckline: Crew neck</li>
                                        <li>Pattern: Print</li>
                                        <li>Fit: Loose Fit</li>
                                        <li>Shape: Straight</li>
                                    </ul>
                                </Paragraph>
                            </div>
                        </div>

                        <div className={'py-[24px]'}>
                            <Divider className={'m-0'}/>
                        </div>

                        <div>
                            <div className={'pb-[12px]'}>
                                <Title level={5}>Description</Title>
                            </div>
                            <div>
                                <Paragraph type="secondary">
                                    This classic white t-shirt is made from 100% cotton, providing a comfortable and
                                    breathable fit. The unisex design makes it a versatile option for men and women. Perfect
                                    for layering or wearing on its own, this t-shirt is a must-have in any wardrobe. It is
                                    available in a variety of sizes, making it easy to find the perfect fit. Whether you're
                                    running errands or dressing up for a night out, this white t-shirt is a versatile and
                                    timeless piece.
                                </Paragraph>
                            </div>
                        </div>

                        <div className={'py-[24px]'}>
                            <Divider className={'m-0'}/>
                        </div>

                        <div>
                            <div className={'pb-[12px]'}>
                                <Title level={5}>Delivery</Title>
                            </div>
                            <div>
                                <Paragraph type="secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex
                                    vitae sodales. Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit.
                                </Paragraph>
                            </div>
                        </div>

                        <div className={'py-[24px]'}>
                            <Divider className={'m-0'}/>
                        </div>

                        <div>
                            <div className={'pb-[12px]'}>
                                <Title level={5}>Return policy</Title>
                            </div>
                            <div>
                                <Paragraph type="secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex
                                    vitae sodales. Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit.
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*END-PRODUCT DETAIL*/}
            {/*START-CUSTOMER REVIEW*/}
            <div className={'p-[48px]'}>
                <div className={'w-[100%]'}>
                    <Title level={2}>Customer reviews</Title>
                </div>
                <div>
                    <div>
                        <div className={'py-[32px]'}>
                            <Divider className={'m-0'}/>
                        </div>
                        <div>
                            <List
                                bordered={false}
                                split={false}
                                itemLayout="vertical"
                                grid={{gutter: 24, column: 3}}
                                dataSource={ProductData}
                                renderItem={(item) => (
                                    <Item className={'mbe-0'}>
                                        <div className={"w-[100%] h-[400px] relative"}>
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
                    <div className={'max-w-[400px] p-[24px]'}></div>
                </div>
            </div>
            {/*END-CUSTOMER REVIEW*/}
        </>


    )
}