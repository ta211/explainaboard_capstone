import React, { useState } from "react";
import { Breadcrumb, Button, Card, Layout as AntdLayout, Space, Typography } from "antd";

import {
    LeftOutlined,
} from "@ant-design/icons";

import SiderLayout from "../../components/sider-layout/SiderLayout";
import { MetricsOverview, AccuracyBatchsizeView, AccuracyLearningRateView } from "../../components/graphs/LineGraph";

import "./ProjectOverview.css";

const metricsTabList = [
    {
      key: 'accuracy',
      tab: 'Accuracy',
    },
    {
      key: 'precision',
      tab: 'Precision',
    },
    {
      key: 'recall',
      tab: 'Recall',
    },
];

export default function ProjectOverview(props) {
    const [collapsed, setCollapsed] = useState(false);
    const deployment = process.env.REACT_APP_DEPLOYMENT;

    const toggle = () => {
        setCollapsed((curr) => !curr);
    };

    return (
        <SiderLayout>
            <Space.Compact direction="vertical" align="start" block style={{margin: "20px 40px"}}>
                <Button type="text" style={{textAlign: "left", width: "min-content", padding: "15px 0"}}>
                    <Space size="large">
                        <LeftOutlined />
                        Projects
                    </Space>
                </Button>
                <Breadcrumb style={{marginTop: "20px"}}>
                    <Breadcrumb.Item>Projects</Breadcrumb.Item>
                    <Breadcrumb.Item>BERT model</Breadcrumb.Item>
                </Breadcrumb>
                <Typography.Title level={1}>Metrics</Typography.Title>
                <Card
                    style={{ width: 'calc(100% - 80px)' }}
                    tabList={metricsTabList}
                    activeTabKey={metricsTabList[0].key}
                    // tabBarExtraContent={<a href="#">More</a>}
                    // onTabChange={onTab2Change}
                >
                    <MetricsOverview />
                </Card>
                <Typography.Title level={1}>Key Value Table</Typography.Title>
                <Typography.Title level={1}>Fine-grained Charts</Typography.Title>
                <Typography.Title level={1}>Insights</Typography.Title>
            </Space.Compact>
        </SiderLayout>
    );
}