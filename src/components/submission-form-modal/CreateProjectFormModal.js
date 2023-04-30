import { useState } from "react";

import { Divider, Form, Input, Modal, Radio, Select, Space, Steps, Tag } from "antd";

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
            title={title}
            open={open}
            onOk={onSubmit}
            onCancel={() => setOpen(false)}
            okText="Submit"
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
                        <Form.Item label="1. Project Name" required>
                            <Input />
                        </Form.Item>
                        <Form.Item label="2. Choose Task" required>
                            <Space.Compact>
                                <Select placeholder="select a task">
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                                <Input placeholder="Input Language" />
                                <Input placeholder="Output Language" />
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item label="3. Choose Dataset" required>
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
                        <Form.Item label="4. Choose Metrics" required>
                            Enter metrics manually, or choose from popular metrics. You can edit these later.
                            <Input />
                            <Tag>accuracy</Tag>
                            <Tag>precision</Tag>
                            <Tag>recall</Tag>
                            <br />
                            <a>Show list of available metrics</a>
                        </Form.Item>
                    </Form>
                },
                {
                    title: 'Privacy & Sharing',
                    description:
                    <Form layout="vertical">
                        <Form.Item label="5. Add COllaborator">
                            Enter the email addresses of the users you'd like to share with, pressing enter after each one.
                            <Input />
                        </Form.Item>
                        <Form.Item label="6. Project Privacy">
                            <Radio.Group value={isPrivate} onChange={()=>setIsPrivate(!isPrivate)}>
                                <Radio value={true}>Private</Radio>
                                <Radio value={false}>Public</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="7. Add Tags to System">
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