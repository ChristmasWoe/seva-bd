import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AppSideBar from './components/AppSideBar/AppSideBar'
import ProjectPage from './components/ProjectPage/ProjectPage'
// const Loaderv1 = require('sko-ui')

// console.log("log",abc.Loaderv1)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppSideBar />
        <Routes>
          <Route path="/project/:projectId" element={<ProjectPage />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
