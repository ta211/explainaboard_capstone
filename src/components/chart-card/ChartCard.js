import { useState } from 'react';

import { Button, Card, Popover, Typography } from 'antd';

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
                <Typography.Text key={index} color="white">{insight}</Typography.Text>
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