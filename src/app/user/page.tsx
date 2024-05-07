'use client';
import React from "react";
import {Checkbox, Col, Divider, Input, Row, Switch, Typography} from "antd";
import Title from "antd/es/typography/Title";

export default function User() {
    const {Text} = Typography;
    const onChange = () => {

    }
    return (
        <>
            <div className={'p-[48px] flex gap-[48px]'}>
                <div className={'w-[253px] p-[16px] border-solid border-[1px] border-gray-200 rounded-[8px] gap-[16px] flex flex-col flex-wrap'}>
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
                    <Row gutter={24}>
                        <Col>
                            <div>
                                <div className={'w-[250px] h-[300px] bg-black'}>

                                </div>
                                <div className={'p-[16px]'}>
                                    <Text strong>GreenBottle</Text>
                                    <Text>An eco-friendly, reusable bottle designed for daily use and sustainable hydration.</Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}