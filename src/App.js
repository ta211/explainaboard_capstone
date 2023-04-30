import React, { useState } from 'react';

import './App.css';

import { ConfigProvider } from 'antd';

import ProjectsList from './pages/projects-list/ProjectsList';
import ProjectOverview from './pages/project-overview/ProjectOverview';

function App() {
  const [page, setPage] = useState("projects-list");

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            fontSizeHeading1: 24,
            lineHeightHeading1: "40px",
            fontSizeHeading2: 20,
            lineHeightHeading2: "40px",
            fontSizeHeading3: 18,
            lineHeightHeading3: "40px",
            fontSizeHeading4: 16,
            lineHeightHeading4: "24px",
          }
        }}
      >
        {page === "projects-list" ? <ProjectsList setPage={setPage}/> : <ProjectOverview setPage={setPage}/>}
      </ConfigProvider>
    </div>
  );
}

export default App;
