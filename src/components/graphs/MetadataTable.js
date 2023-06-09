import { Button, Table } from 'antd';

import "./MetadataTable.css";

import { variableNameToDisplay } from "../../helper/helper";

function generateFilters(data) {
    return [...new Set(data)].map(val => {return {
        text: val,
        value: val,
    }});
}

export default function MetadataTable({
    selectedSystems,
    setSelectedSystems,
    setDisplaySystems,
    systemsData,
}) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        ...Object.keys(systemsData[0]).slice(1, 4).map(
            metricName => {
                return {
                    title: variableNameToDisplay(metricName),
                    dataIndex: metricName,
                    sorter: (a, b) => a[metricName] - b[metricName],
                };
            },
        ),
        ...Object.keys(systemsData[0].metadata).map(
            metadataName => {
                return {
                    title: variableNameToDisplay(metadataName),
                    dataIndex: metadataName,
                    filters: generateFilters(
                        systemsData.map(system => system.metadata[metadataName])
                    ),
                    filterSearch: true,
                    onFilter: (value, data) => data[metadataName] === value,
                    sorter: (a, b) => a[metadataName] - b[metadataName],
                }
            },
        )
    ];

    const data = systemsData.map((system, index) => {
        // This part is still hardcoded
        return {
            key: system.name,
            name: system.name,
            accuracy: system.accuracy,
            precision: system.precision,
            recall: system.recall,
            batch_size: system.metadata.batch_size,
            learning_rate: system.metadata.learning_rate,
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
        <Button style={{display: "block", marginTop: "-50px"}} onClick={()=>setDisplaySystems(selectedSystems)}>
            Update Charts to compare the selected systems
        </Button>
    </div>
    );
};