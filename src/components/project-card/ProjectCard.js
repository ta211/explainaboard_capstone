import { Button, Card, Col, Space, Typography } from 'antd';

import { EditTwoTone } from '@ant-design/icons';

import "./ProjectCard.css";

export default function ProjectCard({
    title,
    task,
    dataset,
    owners,
    mine = false,
    setPage,
}) {
    return (
        <Col span={6}>
        <Card
            className="project-card"
            title={<a onClick={() => {
                if (title.indexOf("[BERT]") !== -1) {
                    setPage("project-overview");
                }
            }}>
                {title}
            </a>}
            extra={<Button type="text"><EditTwoTone /></Button>}
        >
            <Typography.Text className="project-details">
                task: {task}
                <br/>
                dataset: {dataset}
                <br/>
                owners: <Space size={0} className="project-owners">
                    {owners.map((author, id) => {
                    if ((id === 0) && mine) {
                        return (<Button ghost key={`author-${id}`}>
                                    <Typography.Text strong>{author}</Typography.Text>
                                </Button>);
                    } else {
                        return (<Button key={`author-${id}`}>
                                    <Typography.Text key={`author-${id}`}>{author}</Typography.Text>
                                </Button>);
                    }
                })}</Space>
            </Typography.Text>
        </Card>
        </Col>
    )
}