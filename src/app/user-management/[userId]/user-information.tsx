'use client';
import React from "react";
import {Descriptions, Typography} from "antd";

type UserInformationProps = {
    user: {
        username: string;
        email: string;
        full_name: string | null;
        phone: string | null;
        address: string | null;
        is_agent: boolean;
        is_authenticate: boolean;
        createdAt: string;
    };
};

const UserInformation: React.FC<UserInformationProps> = ({user}) => {
    const {Title, Text} = Typography;

    return (
        <section className={'max-w-[900px]'}>
            <div className={'mb-6'}>
                <Title level={2} className={'!mb-2'}>Information</Title>
                <Text type={'secondary'}>Your account information is only visible to you.</Text>
            </div>
            <Descriptions bordered column={1} labelStyle={{width: 220, fontWeight: 600}}>
                <Descriptions.Item label={'Full name'}>{user.full_name || 'Not provided'}</Descriptions.Item>
                <Descriptions.Item label={'Username'}>{user.username}</Descriptions.Item>
                <Descriptions.Item label={'Email'}>{user.email}</Descriptions.Item>
                <Descriptions.Item label={'Phone'}>{user.phone || 'Not provided'}</Descriptions.Item>
                <Descriptions.Item label={'Address'}>{user.address || 'Not provided'}</Descriptions.Item>
                <Descriptions.Item label={'Seller account'}>{user.is_agent ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label={'Authenticated'}>{user.is_authenticate ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label={'Joined'}>{new Date(user.createdAt).toLocaleDateString()}</Descriptions.Item>
            </Descriptions>
        </section>
    )
}

export default UserInformation;
