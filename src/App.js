import React, {useEffect} from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AppSideBar from './components/AppSideBar/AppSideBar'
import ProjectPage from './components/ProjectPage/ProjectPage'
import {useDispatch, useSelector} from "react-redux";
import {Loaderv1} from "sko-ui";
import {getProjects} from "./redux/actions/ProjectActions"
// const Loaderv1 = require('sko-ui')

// console.log("log",abc.Loaderv1)

const App = (props) => {
  const dispatch = useDispatch(); 
  const projectsFetching = useSelector(state=>state.ProjectReducer.projectsFetching);

  useEffect(()=>{
    getProjects(dispatch)
  },[])


  return (
    
    <div className="App">
      {projectsFetching?
      <div style={{height:"100vh",width:"100vw"}}>
      <Loaderv1 />
      </div>
      :
      <BrowserRouter>
      <AppSideBar />
        <Routes>
          <Route path="/project/:projectId" element={<ProjectPage />}  />
        </Routes>
      </BrowserRouter>}
    </div>
  );
}

export default App;
