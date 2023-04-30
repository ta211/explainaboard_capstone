import React, { useState } from 'react';

import './App.css';

import { ConfigProvider } from 'antd';

import ProjectsList from './pages/projects-list/ProjectsList';
import ProjectOverview from './pages/project-overview/ProjectOverview';

function App() {
  const [pages, setPages] = useState({
    curr: "projects-list",
    "projects-list": {filled: false},
    "project-overview": {filled: false},
  });

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
        {pages.curr === "projects-list" ? 
        <ProjectsList pages={pages} setPages={setPages}/> : 
        <ProjectOverview pages={pages} setPages={setPages}/>}
      </ConfigProvider>
    </div>
  );
}

export default App;
