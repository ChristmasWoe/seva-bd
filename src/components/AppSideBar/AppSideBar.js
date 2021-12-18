import React, { useState, useEffect } from "react";
import "./AppSideBar.css";
import { useParams, useNavigate } from "react-router-dom";
import { Config } from "../../config";
import {useSelector} from "react-redux";


const ProjectLine = ({ label, id, color, ...props }) => {
  const history = useNavigate();
  const projectId = window.location.pathname.includes("/project/")
    ? window.location.pathname.substring(9)
    : null;
  const isActive = id == projectId;
  return (
    <div onClick={(e) => history(`/project/${id}`)} className="project-line">
      <div style={{ backgroundColor: color }}></div>
      <p>{label}</p>
      {isActive && <div className="active"></div>}
    </div>
  );
};

const AppSideBar = ({ ...props }) => {
  const projects = useSelector(state=>state.ProjectReducer.projects);


  return (
    <div className="AppSideBar">
      <div className="header">
        <svg
          width="66"
          height="64"
          viewBox="0 0 66 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.7224 54.4225L15.4724 43.8597C14.6286 43.2752 14.2067 42.983 13.9783 42.5471C13.75 42.1112 13.75 41.5979 13.75 40.5715V23.4286C13.75 23.0858 13.75 22.8002 13.7585 22.5557L32 35.1905V55.2591C31.6553 55.0686 31.2526 54.7897 30.7224 54.4225ZM34 55.2591C34.3447 55.0686 34.7474 54.7897 35.2776 54.4225L50.5276 43.8597C51.3714 43.2752 51.7933 42.983 52.0217 42.5471C52.25 42.1112 52.25 41.5979 52.25 40.5714V23.4286C52.25 23.0858 52.25 22.8002 52.2415 22.5557L34 35.1905V55.2591ZM51.3587 20.7343L33 33.4502L14.6413 20.7343C14.8596 20.5648 15.1316 20.3764 15.4724 20.1403L30.7224 9.57757C31.8241 8.81447 32.375 8.43292 33 8.43292C33.625 8.43292 34.1759 8.81447 35.2776 9.57757L50.5276 20.1403C50.8684 20.3764 51.1404 20.5648 51.3587 20.7343Z"
            fill="white"
          />
        </svg>
        <p>TODOLIST</p>
      </div>
      <div style={{ marginTop: "30px" }} className="section">
        <p>Проекты</p>
        {projects.map((project, i) => (
          <ProjectLine
            key={i}
            color={project.Color}
            label={project.Name}
            id={project.Id}
          />
        ))}
      </div>
    </div>
  );
};

export default AppSideBar;
