import React, {useEffect} from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AppSideBar from './components/AppSideBar/AppSideBar'
import ProjectPage from './components/ProjectPage/ProjectPage';
import LabelPage from './components/LabelPage/LabelPage';
import {useDispatch, useSelector} from "react-redux";
import {Loaderv1} from "sko-ui";
import {getProjects} from "./redux/actions/ProjectActions";
import {getLabels} from "./redux/actions/LabelActions"
// const Loaderv1 = require('sko-ui')

// console.log("log",abc.Loaderv1)

const App = (props) => {
  const dispatch = useDispatch(); 
  const projectsFetching = useSelector(state=>state.ProjectReducer.projectsFetching);
  const labelsFetching = useSelector(state=>state.LabelsReducer.labelsFetching)

  useEffect(()=>{
    getProjects(dispatch)
    // getLabels(dispatch)
  },[getProjects])

  useEffect(()=>{
    // getProjects(dispatch)
    getLabels(dispatch)
  },[getLabels])

  return (
    
    <div className="App">
      {projectsFetching||labelsFetching?
      <div style={{height:"100vh",width:"100vw"}}>
      <Loaderv1 />
      </div>
      :
      <BrowserRouter>
      <AppSideBar />
        <Routes>
          <Route path="/project/:projectId" element={<ProjectPage />}  />
        </Routes>
        <Routes>
          <Route path="/label/:labelId" element={<LabelPage />} />
        </Routes>
      </BrowserRouter>}
    </div>
  );
}

export default App;
