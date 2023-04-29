import React, { useState } from "react";
import { Breadcrumb, Button, Input, Layout as AntdLayout, Row, Space, Typography } from "antd";

import {
    LeftOutlined,
} from "@ant-design/icons";

import SiderLayout from "../../components/sider-layout/SiderLayout";
import ProjectCard from "../../components/project-card/ProjectCard";

import "./ProjectsList.css";

import { your_projects, public_projects } from "../../data/projects";

export default function ProjectsList({setPage}) {
    return (        
        <SiderLayout>
            <Space.Compact className="projects-list" direction="vertical" align="start" block>
                <Space className="projects-list-header">
                    <Button type="text" className="projects-button">
                        <Space size="large">
                            <LeftOutlined />
                            Projects
                        </Space>
                    </Button>
                    <Space className="projects-list-toobar" size="large">
                        <Button type="primary" className="create-project-button">
                            Create a Project
                        </Button>
                        <Button className="add-system-button">
                            Add a System
                        </Button>
                        <Input.Search 
                            className="projects-search"
                            placeholder="Search for a project or system"
                        />
                    </Space>
                </Space>

                <Breadcrumb>
                    <Breadcrumb.Item>Projects</Breadcrumb.Item>
                </Breadcrumb>

                <Typography.Title level={1} className="your-projects-title">Your Projects</Typography.Title>
                <Row gutter={16}>
                    {your_projects.map((project, id) => 
                        <ProjectCard
                            key={`projects-personal-${id}`}
                            title={project.name}
                            task={project.task}
                            dataset={project.dataset}
                            owners={project.owners}
                            mine
                            setPage={setPage}
                        />
                    )}
                </Row>

                <Typography.Title level={1} className="public-projects-title">Public Projects</Typography.Title>
                <Row gutter={[16, 16]}>
                    {public_projects.map((project, id) => 
                        <ProjectCard
                            key={`projects-public-${id}`}
                            title={project.name}
                            task={project.task}
                            dataset={project.dataset}
                            owners={project.owners}
                        />
                    )}
                </Row>
            </Space.Compact>
        </SiderLayout>
    );
}