"use client";
import React from 'react';
import { Card, Avatar, Typography, Row, Col, Skeleton } from 'antd';
import { UserOutlined, TrophyOutlined, LineChartOutlined } from '@ant-design/icons';
import { useUser } from "@/context/UserContext"; // Adjust the import path to where your context is defined
import { formatDate } from "@/utils/formatDate";
const { Title, Text } = Typography;

const UserProfile: React.FC = () => {
    const { user } = useUser(); // Accessing the user from context
    const isLoading = !user; // Check if the user data is still being loaded
//test env
    // Default values for formatted date and time
    const { date, time } = user ? formatDate(user.createdAt) : { date: "", time: "" };



    return (
        <Card
            className='m-5'
            style={{ width: '90%', maxWidth: '600px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}

        >
            <Row gutter={16} align="middle">
                <Col>
                    {isLoading ? (
                        <Skeleton.Avatar active size={100} />
                    ) : (
                        <Avatar
                            src={user.picture}
                            size={100}
                            icon={<UserOutlined />}
                            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                        />
                    )}
                </Col>
                <Col flex="auto">
                    {isLoading ? (
                        <Skeleton active title={false} paragraph={{ rows: 2 }} />
                    ) : (
                        <>
                            <Title level={3} style={{ marginBottom: '0.5em' }}>
                                {user.name}
                            </Title>
                            <Text type="secondary">{user.email}</Text>
                        </>
                    )}
                </Col>
            </Row>

            <Row gutter={[16, 16]}  style={{ marginTop: '20px' }}>
                <Col xs={24} sm={12} md={8}>
                    {isLoading ? (
                        <Skeleton.Button active style={{ width: '100%', height: '150px' }} />
                    ) : (
                        <Card bordered={false} style={{ textAlign: 'center', height: '150px' }}>
                            <LineChartOutlined style={{ fontSize: '24px', color: '#4CAF50' }} />
                            <Title level={5} style={{ marginTop: '10px' }}>
                                Scores
                            </Title>
                            <Text>{user.scores}</Text>
                        </Card>
                    )}
                </Col>
                <Col xs={24} sm={12} md={8}>
                    {isLoading ? (
                        <Skeleton.Button active style={{ width: '100%', height: '150px' }} />
                    ) : (
                        <Card bordered={false} style={{ textAlign: 'center', height: '150px' }}>
                            <TrophyOutlined style={{ fontSize: '24px', color: '#FFD700' }} />
                            <Title level={5} style={{ marginTop: '10px' }}>
                                Highest Score
                            </Title>
                            <Text>{user.highestScore}</Text>
                        </Card>
                    )}
                </Col>
                <Col xs={24} sm={12} md={8}>
                    {isLoading ? (
                        <Skeleton.Button active style={{ width: '100%', height: '150px' }} />
                    ) : (
                        <Card bordered={false} style={{ textAlign: 'center', height: '150px' }}>
                            <TrophyOutlined style={{ fontSize: '24px', color: '#FF5722' }} />
                            <Title level={5} style={{ marginTop: '10px' }}>
                                Max Win Streak
                            </Title>
                            <Text>{user.maxWinsStreak}</Text>
                        </Card>
                    )}
                </Col>
            </Row>


            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {isLoading ? (
                    <Skeleton.Input active style={{ width: '100px' }} />
                ) : (
                    <Text type="secondary">Member since: {date} at {time}</Text>
                )}
            </div>
        </Card>
    );
};

export default UserProfile;
