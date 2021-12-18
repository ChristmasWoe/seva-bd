import React, { useState, useEffect } from "react";
import "./AppSideBar.css";
import { useParams, useNavigate } from "react-router-dom";
import { Config } from "../../config";
import { useSelector } from "react-redux";
import ProjectComposer from "../ProjectComposer/ProjectComposer";
import LabelComposer from "../LabelComposer/LabelComposer";

const ProjectLine = ({ label, id, color, onEditClick, ...props }) => {
  const history = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const projectId = window.location.pathname.includes("/project/")
    ? window.location.pathname.substring(9)
    : null;
  const isActive = id == projectId;
  return (
    <div
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
      onClick={(e) => history(`/project/${id}`)}
      className="project-line"
    >
      <div style={{ backgroundColor: color }}></div>
      <p>{label}</p>
      {isHovered && (
        <svg
          onClick={onEditClick}
          style={{
            marginLeft: "auto",
            marginRight: "6px",
            cursor: "pointer",
            width: "18px",
            height: "18px",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M14.078 7.061l2.861 2.862-10.799 10.798-3.584.723.724-3.585 10.798-10.798zm0-2.829l-12.64 12.64-1.438 7.128 7.127-1.438 12.642-12.64-5.691-5.69zm7.105 4.277l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z" />
        </svg>
      )}
      {isActive && (
        <div
          style={{ marginLeft: isHovered ? "0px" : "auto" }}
          className="active"
        ></div>
      )}
    </div>
  );
};

const LabelLine = ({ label, id, color, onEditClick, ...props }) => {
  const history = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const labelId = window.location.pathname.includes("/label/")
    ? window.location.pathname.substring(7)
    : null;
  const isActive = id == labelId;
  console.log("ids", id, labelId, isActive);
  return (
    <div
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
      onClick={(e) => history(`/label/${id}`)}
      className="project-line"
    >
      <div style={{ backgroundColor: color, borderRadius: "0" }}></div>
      <p>{label}</p>
      {isHovered && (
        <svg
          onClick={onEditClick}
          style={{
            marginLeft: "auto",
            marginRight: "6px",
            cursor: "pointer",
            width: "18px",
            height: "18px",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M14.078 7.061l2.861 2.862-10.799 10.798-3.584.723.724-3.585 10.798-10.798zm0-2.829l-12.64 12.64-1.438 7.128 7.127-1.438 12.642-12.64-5.691-5.69zm7.105 4.277l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z" />
        </svg>
      )}
      {isActive && (
        <div
          style={{ marginLeft: isHovered ? "0px" : "auto" }}
          className="active"
        ></div>
      )}
    </div>
  );
};

const AppSideBar = ({ ...props }) => {
  const projects = useSelector((state) => state.ProjectReducer.projects);
  const labels = useSelector((state) => {
    return state.LabelsReducer.labels;
  });
  const [projectComposerIsOpen, setProjectComposerOpen] = useState(false);
  const [labelComposerIsOpen, setLabelComposerOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [labelToEdit, setLabelToEdit] = useState(null);

  useEffect(() => {
    if (!labelComposerIsOpen) {
      setLabelToEdit(null);
    }
  }, [labelComposerIsOpen]);

  useEffect(() => {
    if (!projectComposerIsOpen) {
      setProjectToEdit(null);
    }
  }, [projectComposerIsOpen]);

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
            onEditClick={(e) => {
              setProjectComposerOpen(true);
              setProjectToEdit({ ...project });
            }}
            color={project.Color}
            label={project.Name}
            id={project.Id}
          />
        ))}
        <button
          onClick={(e) => setProjectComposerOpen(true)}
          style={{ marginTop: "30px" }}
        >
          <svg
            style={{ marginRight: "10px" }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z"
              stroke="#29A19C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 6V12"
              stroke="#29A19C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 9H12"
              stroke="#29A19C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Добавить
        </button>
      </div>
      <div style={{ marginTop: "30px" }} className="section">
        <p>Метки</p>
        {labels.map((lb, i) => (
          <LabelLine
            key={i}
            onEditClick={(e) => {
              setLabelComposerOpen(true);
              setLabelToEdit({ ...lb });
            }}
            color={lb.Color}
            label={lb.Name}
            id={lb.Id}
          />
        ))}
        <button
          onClick={(e) => setLabelComposerOpen(true)}
          style={{ marginTop: "30px" }}
        >
          <svg
            style={{ marginRight: "10px" }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z"
              stroke="#29A19C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 6V12"
              stroke="#29A19C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 9H12"
              stroke="#29A19C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Добавить
        </button>
      </div>
      {projectComposerIsOpen && (
        <ProjectComposer
          isOpen={projectComposerIsOpen}
          setOpen={setProjectComposerOpen}
          pn={projectToEdit && projectToEdit.Name}
          pd={projectToEdit && projectToEdit.Description}
          pc={projectToEdit && projectToEdit.Color}
          pid={projectToEdit && projectToEdit.Id}
        />
      )}
      {labelComposerIsOpen && (
        <LabelComposer
          isOpen={labelComposerIsOpen}
          setOpen={setLabelComposerOpen}
          ln={labelToEdit && labelToEdit.Name}
          ld={labelToEdit && labelToEdit.Description}
          lc={labelToEdit && labelToEdit.Color}
          lid={labelToEdit && labelToEdit.Id}
        />
      )}
    </div>
  );
};

export default AppSideBar;
