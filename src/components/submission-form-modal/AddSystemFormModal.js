import { useState } from "react";

import { Button, Col, Divider, Form, Input, Modal, Radio, Row, Select, Space, Steps, Typography } from "antd";

import "./SubmissionFormModal.css";

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
                  title={<Typography.Title level={2}>{title}</Typography.Title>}
                  open={open}
                  onOk={onSubmit}
                  onCancel={() => setOpen(false)}
                  okText="Submit"
                  width="60%"
            >
                  <Typography.Text className="form-description">
                        Upload one or multiple systems to a project to enable cross-system analysis
                  </Typography.Text>
                  <Divider />
                  <Steps
                        direction="vertical"
                        current={step}
                        onChange={stepID => setStep(stepID)}
                        items={[
                        {
                              title: 'Model Information',
                              description: 
                              <Form layout="vertical">
                                    <Form.Item label={<Typography.Title level={4}>1.   System Name</Typography.Title>} required>
                                          <Input value={step > 0 ? "System 5" : null}/>
                                    </Form.Item>
                                    <Form.Item label={<Typography.Title level={4}>2.   Confirm Dataset</Typography.Title>}>
                                          Please make sure the evaluation dataset you used is the same as the one shown below. The performance of two systems evaluated by different datasets cannot be compared.
                                          <Space.Compact>
                                                <Select value="gmu_anlp" disabled>
                                                </Select>
                                                <Input value="train" disabled />
                                          </Space.Compact>
                                    </Form.Item>
                                    <Form.Item label={<Typography.Title level={4}>3.   Upload Model Output</Typography.Title>} required>
                                          <Row>
                                                <Col span={8}>
                                                      {step > 0 && <Button type="default">1328723486basdf12.csv</Button>}
                                                      <div style={{height: "8px"}} />
                                                      <Button type="primary" style={{background: "orange"}}>Add File</Button>
                                                </Col>
                                                <Col span={16}>
                                                      <Radio.Group value={step>0 ? "csv" : outputFileType} onChange={e=>setOutputFileType(e.target.value)}>
                                                            <Radio value="csv">CSV</Radio>
                                                            <Radio value="tsv">TSV</Radio>
                                                            <Radio value="json">JSON/JSON Line</Radio>
                                                            <Radio value="conll">CoNLL</Radio>
                                                            <Radio value="txt">Text</Radio>
                                                      </Radio.Group>
                                                </Col>
                                          </Row>
                                          <br />
                                          <a>Show instructions</a>
                                    </Form.Item>
                              </Form>
                        },
                        {
                              title: 'System Configuration',
                              description: 
                              <Form layout="vertical">
                                    <Form.Item label={<Typography.Title level={4}>4.   Edit Metrics</Typography.Title>} required>
                                          Edit metrics manually, or choose from popular metrics. You can edit these later.
                                          <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Please select at least one metric"
                                                defaultValue={['accuracy', 'precision', 'recall']}
                                                options={['accuracy', 'precision', 'recall', 'f1'].map(val => {return {
                                                      label: val,
                                                      value: val,
                                                }})}
                                          />
                                          <br />
                                          <a>Show list of available metrics</a>
                                    </Form.Item>
                                    <Form.Item label={<Typography.Title level={4}>5.   Enter Model Metadata</Typography.Title>}>
                                          Copy and pasting model metadata will allow us to generate insight and assist you in finding the optimal hyper-parameter configuration for your model. Popular hyper-parameters are generated based on your system task in step 1. 
                                          <br />
                                          <Input.TextArea 
                                                value={step>1 ? 
                                                      "\{\n\tbatch_size: 8, \n\tlearning_rate: 0.0002, \n\tvocab_size: 30522, \n\thidden_size: 768, \n\tnum_hidden_layers=12\n} " :
                                                      "\{\n\tbatch_size: 16, \n\tlearning_rate: 0.0003, \n\tvocab_size: 30522, \n\thidden_size: 768, \n\tnum_hidden_layers=12\n} "
                                          }/>
                                    </Form.Item>
                              </Form>
                        },
                        {
                              title: "Done",
                        }
                        ]}
                  />
            </Modal>
      );
}