import './App.css';

import { ConfigProvider } from 'antd';

import ProjectOverview from './pages/project-overview/ProjectOverview';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            fontSizeHeading1: 24,
            lineHeightHeading1: "40px",
            fontSizeHeading2: 20,
            lineHeightHeading2: "40px",
            fontSizeHeading3: 20,
            lineHeightHeading3: "40px",
            fontSizeHeading3: 18,
            lineHeightHeading3: "40px",
          }
        }}
      >
          <ProjectOverview />
      </ConfigProvider>
    </div>
  );
}

export default App;
