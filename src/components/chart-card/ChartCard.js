import { Card } from 'antd';

export default function ChartCard({
    title,
    insights,
    children,
}) {
    return (
        <Card>
            {children}
        </Card>
    )
}