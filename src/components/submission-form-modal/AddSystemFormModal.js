import { useState } from "react";

import { Button, Divider, Form, Input, Modal, Radio, Select, Space, Steps, Tag } from "antd";

export default function AddSystemFormModal({
    title, 
    open,
    setOpen,
    onSubmit,
}) {
    const [step, setStep] = useState(0);
    const [outputFileType, setOutputFileType] = useState("txt");

    return (
        <Modal 
            title={title}
            open={open}
            onOk={onSubmit}
            onCancel={() => setOpen(false)}
            okText="Submit"
        >
            Upload one or multiple systems to a project to enable cross-system analysis
            <Divider />
            <Steps
                direction="vertical"
                current={step}
                items={[
                {
                    title: 'Model Information',
                    description: 
                    <Form layout="vertical">
                        <Form.Item label="1. System Name" required>
                            <Input />
                        </Form.Item>
                        <Form.Item label="2. Confirm Dataset">
                            Please make sure the evaluation dataset you used is the same as the one shown below. The performance of two systems evaluated by different datasets cannot be compared.
                            <Space.Compact>
                                <Select value="gmu_anlp" disabled>
                                </Select>
                                <Input value="train" disabled />
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item label="3. Upload Model Output" required>
                            <Space direction="horizontal">
                                <Button type="primary" style={{background: "orange"}}>Add File</Button>
                                <Radio.Group value={outputFileType} onChange={e=>setOutputFileType(e.target.value)}>
                                    <Radio value="csv">CSV</Radio>
                                    <Radio value="tsv">TSV</Radio>
                                    <Radio value="json">JSON/JSON Line</Radio>
                                    <Radio value="conll">CoNLL</Radio>
                                    <Radio value="txt">Text</Radio>
                                </Radio.Group>
                            </Space>
                            <a>Show instructions</a>
                        </Form.Item>
                    </Form>
                },
                {
                    title: 'System Configuration',
                    description: 
                    <Form layout="vertical">
                        <Form.Item label="4. Edit Metrics" required>
                            Edit metrics manually, or choose from popular metrics. You can edit these later.
                            <Select
                                mode="multiple"
                                allowClear
                                // style={{
                                //     width: '100%',
                                // }}
                                placeholder="Please select at least one metric"
                                defaultValue={['accuracy', 'precision', 'recall']}
                                // onChange={handleChange}
                                options={['accuracy', 'precision', 'recall', 'f1'].map(val => {return {
                                    label: val,
                                    value: val,
                                }})}
                            />
                            <a>Show list of available metrics</a>
                        </Form.Item>
                        <Form.Item label="5. Enter Model Metadata">
                            Copy and pasting model metadata will allow us to generate insight and assist you in finding the optimal hyper-parameter configuration for your model. Popular hyper-parameters are generated based on your system task in step 1. 
                            <Input />
                        </Form.Item>
                    </Form>
                },
                ]}
            />
        </Modal>
    );
}