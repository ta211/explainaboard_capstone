import React, { useState } from "react";
import { Button, Card, Space, Typography } from "antd";

import ThumbsUp from "../../img/ThumbsUp.svg";
import ThumbsDown from "../../img/ThumbsDown.svg";

import SiderLayout from "../../components/sider-layout/SiderLayout";
import ChartCard from "../../components/chart-card/ChartCard";
import LineGraph from "../../components/graphs/LineGraph";
import ScatterGraph from "../../components/graphs/ScatterGraph";
import MetadataTable from "../../components/graphs/MetadataTable";
import AddSystemFormModal from "../../components/submission-form-modal/AddSystemFormModal";

import { labels, length_in_tokens, insights, systems } from  "../../data/bert_project_systems";
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

export default function ProjectOverview({pages, setPages}) {
    const [metric, setMetric] = useState("accuracy");

    const systemLen = pages["project-overview"].filled ? 5 : 4;
    
    const [selectedSystems, setSelectedSystems] = useState(systems.map(system => system.name));
    const [displaySystems, setDisplaySystems] = useState(systems.map(system => system.name));
    const [addingSystem, setAddingSystem] = useState(false);

    return (
        <SiderLayout
            pageName="project-overview"
            extra={<>
                <Button 
                    type="primary" 
                    className="add-system-button"
                    onClick={()=>setAddingSystem(true)}
                >
                    Add a System
                </Button>
                <AddSystemFormModal 
                    title={"Add a System"}
                    open={addingSystem}
                    setOpen={setAddingSystem}
                    onSubmit={() => {setAddingSystem(false); setPages({...pages, "project-overview": {filled: true}});}}
                />
            </>}
            pages={pages}
            setPages={setPages}
        >
            <Typography.Title level={1} className="metrics-title">Metrics</Typography.Title>
            <Card
                tabList={metricsTabList}
                activeTabKey={metric}
                onTabChange={metric_key => setMetric(metric_key)}
            >
                {/* <MetricsOverview /> */}
                <LineGraph 
                    xAxisData={systems.slice(0,systemLen).map(system => system.name)}
                    xAxisName="Systems"
                    yAxisData={systems.slice(0,systemLen).map(system => system[metric]*100)}
                    yAxisName={variableNameToDisplay(metric) + " (%)"}
                />
            </Card>
            
            <Typography.Title level={1}>Key Value Table</Typography.Title>
            <MetadataTable 
                selectedSystems={selectedSystems.slice(0, systemLen)}
                setSelectedSystems={setSelectedSystems}
                setDisplaySystems={setDisplaySystems}
                systemsData={systems.slice(0, systemLen)}
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
                                xAxisData={systems.slice(0,systemLen).map(system => system.metadata[thisMetadata])}
                                xAxisName={variableNameToDisplay(thisMetadata)}
                                yAxisData={systems.slice(0,systemLen).map(system => system[metric] * 100)}
                                yAxisName={variableNameToDisplay(metric) + " (%)"}
                                categories={systems.slice(0,systemLen).map(system => system.name)}
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
                        xAxisData={systems.slice(0,systemLen).map(_ => labels)}
                        xAxisName=""
                        yAxisData={systems.slice(0,systemLen).map(system => system.accuracy_by_label.map(acc => acc * 100))}
                        yAxisName="Accuracy (%)"
                        categories={systems.slice(0,systemLen).map(system => system.name)}
                        selectedCategories={displaySystems}
                    />
                </ChartCard>
                
                <ChartCard
                    title="Accuracy by Text Length of Tokens in the input"
                    insights={insights["accuracy by text length of tokens in the input"]}
                >
                    <ScatterGraph
                        xAxisData={systems.slice(0,systemLen).map(_ => length_in_tokens)}
                        xAxisName="Length of Tokens in the input"
                        yAxisData={systems.slice(0,systemLen).map(system => system.accuracy_by_tokens.map(acc => acc * 100))}
                        yAxisName="Accuracy (%)"
                        categories={systems.slice(0,systemLen).map(system => system.name)}
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
        </SiderLayout>
    );
}