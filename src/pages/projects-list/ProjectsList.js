import { Button, Input, Row, Typography } from "antd";

import SiderLayout from "../../components/sider-layout/SiderLayout";
import ProjectCard from "../../components/project-card/ProjectCard";

import "./ProjectsList.css";

import { your_projects, public_projects } from "../../data/projects";

export default function ProjectsList({setPage}) {
    return (        
        <SiderLayout 
            pageName="projects-list"
            extra={<>
                <Button type="primary" className="add-system-button">
                    Add a System
                </Button>
                <Input.Search 
                    className="projects-search"
                    placeholder="Search for a project or system"
            /></>}
            setPage={setPage}
        >
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
        </SiderLayout>
    );
}