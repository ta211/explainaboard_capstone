import React, { useState } from "react";
import { Layout as AntdLayout, Menu } from "antd";
import logo from "../../logo-simple.png";

import {
    HomeOutlined,
    DatabaseOutlined,
    CodeOutlined,
    LineChartOutlined,
    ReadOutlined,
    FileOutlined,
    GithubFilled
} from "@ant-design/icons";
  
import "./SiderLayout.css";

function getItem(
    label,
    key,
    icon,
    children,
    type,
) {
    return {
    key,
    icon,
    children,
    label,
    type,
    };
}

export default function SiderLayout(props) {
    const [collapsed, setCollapsed] = useState(false);
    const deployment = process.env.REACT_APP_DEPLOYMENT;

    const toggle = () => {
        setCollapsed((curr) => !curr);
    };

    return (
        <AntdLayout style={{ minHeight: "100vh" }}>
        <AntdLayout.Sider collapsible collapsed={collapsed} onCollapse={toggle}>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={["projects"]}
                items={[
                    getItem(
                        <div className="site-title">ExplainaBoard</div>,
                        'logo', 
                        <img src={logo} alt="" style={{ height: "20px" }} />,
                    ),
                    getItem('Home', 'home', <HomeOutlined />),
                    getItem('Datasets', 'datasets', <DatabaseOutlined />),
                    getItem('Projects', 'projects', <CodeOutlined />),
                    getItem('Benchmarks', 'benchmarks', <LineChartOutlined />),
                    getItem('Tutorials', 'tutorials', <ReadOutlined />),
                    getItem('Terms', 'terms', <FileOutlined />)
                ]}
            >
            </Menu>
        </AntdLayout.Sider>
        <AntdLayout className="site-layout">
            <AntdLayout.Header className="site-layout-header">
            <div className="header-items-container">
                <div className="header-icon">
                    <GithubFilled />
                </div>
                <div style={{ paddingRight: "10px" }}>
                {deployment === "dev" && "(dev environment)"}
                </div>
                <div>
                    Hi, Nightshade Malto!
                </div>
                {/* <UserPanel /> */}
            </div>
            </AntdLayout.Header>
            <AntdLayout.Content>
            <div className="site-layout-content">
                {/* <Outlet /> */}
            </div>
            </AntdLayout.Content>
        </AntdLayout>
        </AntdLayout>
    );
}