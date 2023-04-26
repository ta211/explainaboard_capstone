import { Button, Table } from 'antd';
import { useState } from 'react';

import "./MetadataTable.css";

import { systems } from  "../../data/data";

function variableNameToDisplay(name) {
    const parts = name.split("_");
    return {
        title: parts.map(part => part[0].toUpperCase() + part.substring(1)).join(" "),
        dataIndex: name,
    };
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    ...Object.keys(systems[0]).slice(0, -2).map(variableNameToDisplay)
];

const data = systems.map((system, index) => {
    return {
        key: `${index + 1}`,
        name: `System ${index+1}`,
        accuracy: system.accuracy,
        precision: system.precision,
        recall: system.recall,
        batch_size: system.batch_size,
        learning_rate: system.learning_rate,
    }
})


// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

export default function MetadataTable() {
    return (
    <div>
        <Table
            rowSelection={{
                type: "checkbox",
                ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
        />
        <Button style={{display: "block", marginTop: "-50px"}}>
            Update Charts to compare the selected systems
        </Button>
    </div>
    );
};