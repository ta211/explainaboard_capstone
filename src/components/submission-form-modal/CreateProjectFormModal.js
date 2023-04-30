import { useState } from "react";

import { Divider, Form, Input, Modal, Radio, Select, Space, Steps, Tag, Typography } from "antd";

import "./SubmissionFormModal.css";

export default function CreateProjectFormModal({
    title, 
    open,
    setOpen,
    onSubmit,
}) {
    const [step, setStep] = useState(0);
    const [isPrivate, setIsPrivate] = useState(true);

    return (
        <Modal 
            title={<Typography.Title level={2}>{title}</Typography.Title>}
            open={open}
            onOk={onSubmit}
            onCancel={() => setOpen(false)}
            okText="Submit"
            width="60%"
        >
            Upload multiple systems to a project to enable cross-system analysis
            <Divider />
            <Steps
                direction="vertical"
                current={step}
                items={[
                {
                    title: 'Project Information',
                    description: 
                    <Form layout="vertical">
                        <Form.Item label={<Typography.Title level={4}>1.   Project Name</Typography.Title>} required>
                            <Input />
                        </Form.Item>
                        <Form.Item label={<Typography.Title level={4}>2.   Choose Task</Typography.Title>} required>
                            <Space.Compact>
                                <Select placeholder="select a task">
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                                <Input placeholder="Input Language" />
                                <Input placeholder="Output Language" />
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item label={<Typography.Title level={4}>3.   Choose Dataset</Typography.Title>} required>
                            <Space.Compact>
                                <Select placeholder="choose a dataset">
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                                <Select placeholder="split">
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Space.Compact>
                        </Form.Item>
                    </Form>
                },
                {
                    title: 'System Configuration',
                    description: 
                    <Form layout="vertical">
                        <Form.Item label={<Typography.Title level={4}>4.   Choose Metrics</Typography.Title>} required>
                            Enter metrics manually, or choose from popular metrics. You can edit these later.
                            
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Please select at least one metric"
                                defaultValue={[]}
                                options={['accuracy', 'precision', 'recall', 'f1'].map(val => {return {
                                    label: val,
                                    value: val,
                                }})}
                            />
                            <Space direction="horizontal" className="tag-list">
                                <Tag>accuracy</Tag>
                                <Tag>precision</Tag>
                                <Tag>recall</Tag>
                            </Space>
                            <br />
                            <a>Show list of available metrics</a>
                        </Form.Item>
                    </Form>
                },
                {
                    title: 'Privacy & Sharing',
                    description:
                    <Form layout="vertical">
                        <Form.Item label={<Typography.Title level={4}>5.   Add Collaborator</Typography.Title>}>
                            Enter the email addresses of the users you'd like to share with, pressing enter after each one.
                            <Input />
                        </Form.Item>
                        <Form.Item label={<Typography.Title level={4}>6.   Project Privacy</Typography.Title>}>
                            <Radio.Group value={isPrivate} onChange={()=>setIsPrivate(!isPrivate)}>
                                <Radio value={true}>Private</Radio>
                                <Radio value={false}>Public</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={<Typography.Title level={4}>7.   Add Tags to System</Typography.Title>}>
                            Tags to help yourself and others group your systems
                            <Input />
                            <Tag>experiment</Tag>
                            <Tag>course-project</Tag>
                        </Form.Item>
                    </Form>
                },
                ]}
            />
        </Modal>
    );
}