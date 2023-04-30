import React, { useState } from "react";
import { Breadcrumb, Button, Layout as AntdLayout, Menu, Space } from "antd";
import logo from "../../logo-simple.png";

import {
    HomeOutlined,
    DatabaseOutlined,
    CodeOutlined,
    LineChartOutlined,
    ReadOutlined,
    FileOutlined,
    GithubFilled,
    LeftOutlined,
} from "@ant-design/icons";

import { your_name, your_projects } from "../../data/projects";

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

export default function SiderLayout({
    extra = null,
    pages,
    setPages,
    children,
}) {
    const [collapsed, setCollapsed] = useState(false);
    const deployment = process.env.REACT_APP_DEPLOYMENT;

    const toggle = () => {
        setCollapsed((curr) => !curr);
    };

    return (
        <AntdLayout hasSider style={{ minHeight: "100vh", maxWidth: "100vw", overflow: "hidden" }}>
        <AntdLayout.Sider collapsible collapsed={collapsed} onCollapse={toggle} style={{position: "fixed", minHeight: "100vh"}}>
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
        <AntdLayout className="site-layout" style={{marginLeft: collapsed ? "80px" : "200px"}}>
            <AntdLayout.Header className="site-layout-header">
            <div className="header-items-container">
                <div className="header-icon">
                    <GithubFilled />
                </div>
                <div style={{ paddingRight: "10px" }}>
                {deployment === "dev" && "(dev environment)"}
                </div>
                <div>
                    Hi, {your_name}!
                </div>
                {/* <UserPanel /> */}
            </div>
            </AntdLayout.Header>
            <AntdLayout.Content>
                <Space.Compact className={`${pages.curr} sider-layout-content`} direction="vertical" align="start" block>
                    <Space className={`${pages.curr}-header sider-layout-content-header`}>
                        <Button type="text" className="projects-button" onClick={() => {
                            setPages({
                                ...pages,
                                curr: "projects-list",
                            });
                        }}>
                            <Space size="large">
                                <LeftOutlined />
                                Projects
                            </Space>
                        </Button>
                        
                        <Space className={`page-toolbar ${pages.curr}-toolbar`} size="large">
                            {extra}
                        </Space>
                    </Space>

                    <Breadcrumb className={`page-breadcrumb ${pages.curr}-breadcrumb`}>
                        <Breadcrumb.Item>Projects</Breadcrumb.Item>
                        <Breadcrumb.Item>{pages.curr === "projects-list" ? "All Projects": your_projects[0].name}</Breadcrumb.Item>
                    </Breadcrumb>

                    {children}
                </Space.Compact>
            </AntdLayout.Content>
        </AntdLayout>
        </AntdLayout>
    );
}