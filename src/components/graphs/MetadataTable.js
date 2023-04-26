import { Button, Table } from 'antd';

import "./MetadataTable.css";

function variableNameToDisplay(name) {
    const parts = name.split("_");
    return {
        title: parts.map(part => part[0].toUpperCase() + part.substring(1)).join(" "),
        dataIndex: name,
    };
}

export default function MetadataTable({
    selectedSystems,
    setSelectedSystems,
    systemsData,
}) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        ...Object.keys(systemsData[0]).slice(1, -2).map(variableNameToDisplay)
    ];

    const data = systemsData.map((system, index) => {
        return {
            key: system.name,
            name: system.name,
            accuracy: system.accuracy,
            precision: system.precision,
            recall: system.recall,
            batch_size: system.batch_size,
            learning_rate: system.learning_rate,
        }
    })

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        selectedRowKeys: selectedSystems,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedSystems(selectedRowKeys);
            // console.log(
            //     `selectedRowKeys: ${selectedRowKeys}`, 
            //     'selectedRows: ', selectedRows
            // );
        },
    };

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