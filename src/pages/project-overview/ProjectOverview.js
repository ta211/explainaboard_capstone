import React, { useState } from "react";
import { Breadcrumb, Button, Card, Col, Layout as AntdLayout, Space, Typography } from "antd";

import {
    LeftOutlined,
} from "@ant-design/icons";

import ThumbsUp from "../../img/ThumbsUp.svg";
import ThumbsDown from "../../img/ThumbsDown.svg";

import SiderLayout from "../../components/sider-layout/SiderLayout";
import ChartCard from "../../components/chart-card/ChartCard";
import LineGraph from "../../components/graphs/LineGraph";
import ScatterGraph from "../../components/graphs/ScatterGraph";
import MetadataTable from "../../components/graphs/MetadataTable";

import { labels, length_in_tokens, insights, systems } from  "../../data/data";
import { variableNameToDisplay } from "../../helper/helper";

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
    const [selectedSystems, setSelectedSystems] = useState(systems.map(system => system.name));
    const [displaySystems, setDisplaySystems] = useState(systems.map(system => system.name));

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
                        xAxisData={systems.map(system => system.name)}
                        xAxisName="Systems"
                        yAxisData={systems.map(system => system[metric]*100)}
                        yAxisName={variableNameToDisplay(metric) + " (%)"}
                    />
                </Card>
                
                <Typography.Title level={1}>Key Value Table</Typography.Title>
                <MetadataTable 
                    selectedSystems={selectedSystems}
                    setSelectedSystems={setSelectedSystems}
                    setDisplaySystems={setDisplaySystems}
                    systemsData={systems}
                />

                <Space align="baseline">
                    <Typography.Title level={1}>Fine-grained Charts</Typography.Title>
                    <Typography.Text type="secondary">For selected systems</Typography.Text>
                </Space>
                <Space className="projects-charts-container" wrap>
                    {/* Metric vs Metadata charts */}
                    {
                        Object.keys(systems[0].metadata).map((thisMetadata, index) => {

                            return (
                            <ChartCard
                                title={`${variableNameToDisplay(metric)} by ${variableNameToDisplay(thisMetadata)}`}
                                insights={insights[metric + " vs " + thisMetadata]}
                            >
                                <ScatterGraph 
                                    xAxisData={systems.map(system => system.metadata[thisMetadata])}
                                    xAxisName={variableNameToDisplay(thisMetadata)}
                                    yAxisData={systems.map(system => system[metric] * 100)}
                                    yAxisName={variableNameToDisplay(metric) + " (%)"}
                                    categories={systems.map(system => system.name)}
                                    selectedCategories={displaySystems}
                                />
                            </ChartCard>
                        )})
                    }
                    {/* Upgraded original ExplainaBoard charts */}
                    <ChartCard
                        title="Accuracy by True Label of the input"
                        insights={insights["accuracy by true label of the input"]}
                    >
                        <ScatterGraph 
                            xAxisData={systems.map(_ => labels)}
                            xAxisName=""
                            yAxisData={systems.map(system => system.accuracy_by_label.map(acc => acc * 100))}
                            yAxisName="Accuracy (%)"
                            categories={systems.map(system => system.name)}
                            selectedCategories={displaySystems}
                        />
                    </ChartCard>
                    
                    <ChartCard
                        title="Accuracy by Text Length of Tokens in the input"
                        insights={insights["accuracy by text length of tokens in the input"]}
                    >
                        <ScatterGraph
                            xAxisData={systems.map(_ => length_in_tokens)}
                            xAxisName="Length of Tokens in the input"
                            yAxisData={systems.map(system => system.accuracy_by_tokens.map(acc => acc * 100))}
                            yAxisName="Accuracy (%)"
                            categories={systems.map(system => system.name)}
                            selectedCategories={displaySystems}
                        />
                    </ChartCard>
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