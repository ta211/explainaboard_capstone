import { useState } from 'react';

import { Button, Card, Popover, Row, Typography } from 'antd';

import "./ChartCard.css";

export default function ChartCard({
    title,
    insights=[],
    children,
}) {
    const [showInsights, setShowInsights] = useState(false);

    let insightDisplay = null;

    if (insights.length > 0) {
        let insightContent = 
        <div className="insight-content">
            {insights.map((insight, index) => 
            <Row key={index} >
                <Typography.Text color="white">
                    {insights.length > 1 ? "·  " : ""}{insight}
                </Typography.Text>
            </Row>
            )}
        </div>;

        insightDisplay = 
        <Popover 
            className="insight-popover"
            placement="bottomRight" 
            content={insightContent} 
            trigger="click"
            open={showInsights}
            onOpenChange={(newOpen) => setShowInsights(newOpen)}
            arrow={false}
        >
            <Button type="primary">
                <Typography.Text className="insight-button">
                    {`${insights.length} insights`}
                </Typography.Text>
            </Button>
        </Popover>;
    }
    return (
        <Card
            className="chart-card"
            title={title}
            extra={insightDisplay}
        >
            {children}
        </Card>
    )
}