import { Card, Typography } from 'antd';

import "./ChartCard.css";

export default function ChartCard({
    title,
    insights,
    children,
}) {
    return (
        <Card
            className="chart-card"
            extra={insights}
            title={title}
        >
            {/* <Typography.Title className="chart-card-title" level={3}>{title}</Typography.Title> */}
            {children}
        </Card>
    )
}