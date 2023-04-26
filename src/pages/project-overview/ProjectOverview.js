import React, { useState } from "react";
import { Breadcrumb, Button, Card, Col, Layout as AntdLayout, Space, Typography } from "antd";

import {
    LeftOutlined,
} from "@ant-design/icons";

import ThumbsUp from "../../img/ThumbsUp.svg";
import ThumbsDown from "../../img/ThumbsDown.svg";

import SiderLayout from "../../components/sider-layout/SiderLayout";
import LineGraph from "../../components/graphs/LineGraph";
import { MetricsOverview, AccuracyBatchsizeView, AccuracyLearningRateView } from "../../components/graphs/HardcodedGraphs";
import MetadataTable from "../../components/graphs/MetadataTable";

import { systems } from  "../../data/data";

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
    const [metric, setMetric] = useState("accuracy");

    return (
        <SiderLayout>
            <Space.Compact className="project-overview" direction="vertical" align="start" block>
                <Button type="text">
                    <Space size="large">
                        <LeftOutlined />
                        Projects
                    </Space>
                </Button>

                <Breadcrumb>
                    <Breadcrumb.Item>Projects</Breadcrumb.Item>
                    <Breadcrumb.Item>BERT model</Breadcrumb.Item>
                </Breadcrumb>
                
                <Typography.Title level={1} className="metrics-title">Metrics</Typography.Title>
                <Card
                    tabList={metricsTabList}
                    activeTabKey={metric}
                    onTabChange={metric_key => setMetric(metric_key)}
                >
                    {/* <MetricsOverview /> */}
                    <LineGraph 
                        xAxis_data={[...Array(5).keys()].map(id => `System ${id+1}`)}
                        xAxis_name="Systems"
                        yAxis_data={systems.map(system => system[metric]*100)}
                        yAxis_name={metric[0].toUpperCase() + metric.substring(1) + " (%)"}
                    />
                </Card>
                
                <Typography.Title level={1}>Key Value Table</Typography.Title>
                <MetadataTable />

                <Space align="baseline">
                    <Typography.Title level={1}>Fine-grained Charts</Typography.Title>
                    <Typography.Text type="secondary">For selected systems</Typography.Text>
                </Space>
                <Space className="projects-charts-container" wrap>
                    <Card><AccuracyBatchsizeView /></Card>
                    <Card><AccuracyLearningRateView /></Card>
                    <Card><AccuracyLearningRateView /></Card>
                    <Card><AccuracyBatchsizeView /></Card>
                </Space>

                <Typography.Title level={1}>Insights</Typography.Title>
                <Card className="projects-insights-container">
                    <Space align="baseline">
                        <img src={ThumbsUp} alt="A good thing" />
                        <Typography.Title level={4}>
                            System 1 on average has highest accuracy predicting all labels.
                        </Typography.Title>
                    </Space>
                    <Space align="baseline">
                        <img src={ThumbsUp} alt="A good thing" />
                        <Typography.Title level={4}>
                        System 5 outperforms all other systems for large text length.
                        </Typography.Title>
                    </Space>
                    <Space align="baseline">
                        <img src={ThumbsDown} alt="A bad thing" />
                        <Typography.Title level={4}>
                        System 2 performs worse than other systems overall for text length under 31 tokens.
                        </Typography.Title>
                    </Space>
                </Card>
            </Space.Compact>
        </SiderLayout>
    );
}