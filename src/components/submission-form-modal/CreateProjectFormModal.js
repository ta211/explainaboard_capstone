import { useState } from "react";

import { Divider, Form, Input, Modal, Radio, Select, Space, Steps, Tag, Typography } from "antd";

import { your_projects } from "../../data/projects";

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
                onChange={stepID => setStep(stepID)}
                items={[
                {
                    title: 'Project Information',
                    description: 
                    <Form layout="vertical">
                        <Form.Item label={<Typography.Title level={4}>1.   Project Name</Typography.Title>} required>
                            <Input value={step > 0 ? your_projects[0].name : null}/>
                        </Form.Item>
                        <Form.Item label={<Typography.Title level={4}>2.   Choose Task</Typography.Title>} required>
                            <Space.Compact>
                                <Select placeholder="select a task" value={step > 0 ? "text-classification": null}>
                                    {[
                                        "text-classification",
                                        "summarization",
                                        "named-entity-recognition",
                                        "chunking",
                                        "aspect-based-sentiment-classification",
                                        "qa-extractive",
                                        "conditional-generation",
                                        "machine-translation",
                                        "binary-classification",
                                    ].map(task => <Select.Option value={task} key={task}>{task}</Select.Option>)}
                                </Select>
                                <Input placeholder="Input Language" value={step > 0 ? "English (eng)" : null} />
                                <Input placeholder="Output Language" value={step > 0 ? "English (eng)" : null} />
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item label={<Typography.Title level={4}>3.   Choose Dataset</Typography.Title>} required>
                            <Space.Compact>
                                <Select placeholder="choose a dataset" value={step > 0 ? "gmu_anlp" : null}>
                                    {[
                                        "gmu_anlp",
                                        "gaokao2019",
                                        "masakhaner-mos",
                                        "conll00_chunk",
                                        "twitter",
                                        "hotpot-qa",
                                        "wikilingua|en",
                                        "wmt-20|encs",
                                        "FakeNewsNet",
                                        "LegalTextNet",
                                    ].map(dataset => <Select.Option value={dataset} key={dataset}>{dataset}</Select.Option>)}                                </Select>
                                <Select placeholder="split" value={step > 0 ? "train" : null}>
                                    <Select.Option value="train">train</Select.Option>
                                    <Select.Option value="test">test</Select.Option>
                                    <Select.Option value="validation">validation</Select.Option>
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
                                value={step>1 ? ['accuracy', 'precision', 'recall'] : []}
                                options={['accuracy', 'precision', 'recall', 'f1'].map(val => {return {
                                    label: val,
                                    value: val,
                                }})}
                            />
                            <Space direction="horizontal" className="tag-list" style={{display: `${step>1 ? "none":"flex"}`}}>
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
                            Enter the name or email addresses of the users you'd like to share with, pressing enter after each one.
                            
                            <Select
                                mode="multiple"
                                allowClear
                                value={step>2 ? ['Alex M. (UX)', 'Dorothy M. (PM)', 'Meggie T(Annotator)'] : []}
                                options={['Alex M. (UX)', 'Dorothy M. (PM)', 'Meggie T(Annotator)'].map(val => {return {
                                    label: val,
                                    value: val,
                                }})}
                            />
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
                {
                    title: 'Done'
                }
                ]}
            />
        </Modal>
    );
}