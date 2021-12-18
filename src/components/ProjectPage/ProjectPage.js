import React, { useState, useEffect } from "react"
import "./ProjectPage.css";
import { useParams } from "react-router-dom";
import { Config } from "../../config";
import TaskComposer from '../TaskComposer/TaskComposer'

const mockArray = [
  {
    name: "Приготовить вкусный ужин",
    id: "1",
    status: false,
  },
  {
    name: "Устранить засор в раковине",
    id: "2",
    status: false,
  },
  {
    name: "Стирка белого белья",
    id: "3",
    status: false,
  },
  {
    name: "Разморозить холодильник",
    id: "4",
    status: false,
  },
  {
    name: "Полить цветы",
    id: "5",
    status: true,
  },
  {
    name: "Вызвать сантехника",
    id: "6",
    status: true,
  },
];

const TaskLine = ({ name, id, status, ...props }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
      className="task-line"
    >
      {isHovered && (
        <svg
          style={{ marginRight: "10px" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="3.5"
            stroke="#00AF91"
          />
        </svg>
      )}
      {name}
      {/* edit */}
      {isHovered && (
        <svg
          style={{ marginLeft: "auto" }}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.54159 3.04159C1.92839 2.6548 2.45299 2.4375 3 2.4375H8.25C8.56066 2.4375 8.8125 2.68934 8.8125 3C8.8125 3.31066 8.56066 3.5625 8.25 3.5625H3C2.75136 3.5625 2.5129 3.66127 2.33709 3.83709C2.16127 4.0129 2.0625 4.25136 2.0625 4.5V15C2.0625 15.2486 2.16127 15.4871 2.33709 15.6629C2.5129 15.8387 2.75136 15.9375 3 15.9375H13.5C13.7486 15.9375 13.9871 15.8387 14.1629 15.6629C14.3387 15.4871 14.4375 15.2486 14.4375 15V9.75C14.4375 9.43934 14.6893 9.1875 15 9.1875C15.3107 9.1875 15.5625 9.43934 15.5625 9.75V15C15.5625 15.547 15.3452 16.0716 14.9584 16.4584C14.5716 16.8452 14.047 17.0625 13.5 17.0625H3C2.45299 17.0625 1.92839 16.8452 1.54159 16.4584C1.1548 16.0716 0.9375 15.547 0.9375 15V4.5C0.9375 3.95299 1.1548 3.42839 1.54159 3.04159Z"
            fill="#F9F9F9"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 1.9715C14.7272 1.9715 14.4656 2.07986 14.2728 2.27273L7.25793 9.28757L6.77309 11.2269L8.71243 10.7421L15.7273 3.72724C15.9201 3.53436 16.0285 3.27276 16.0285 2.99999C16.0285 2.72721 15.9201 2.46561 15.7273 2.27273C15.5344 2.07986 15.2728 1.9715 15 1.9715ZM13.4773 1.47724C13.8811 1.07338 14.4289 0.846497 15 0.846497C15.5712 0.846497 16.1189 1.07338 16.5228 1.47724C16.9266 1.8811 17.1535 2.42885 17.1535 2.99999C17.1535 3.57113 16.9266 4.11888 16.5228 4.52273L9.39776 11.6477C9.32567 11.7198 9.23534 11.771 9.13644 11.7957L6.13644 12.5457C5.94475 12.5936 5.74198 12.5374 5.60226 12.3977C5.46255 12.258 5.40639 12.0552 5.45431 11.8636L6.20431 8.86356C6.22903 8.76466 6.28017 8.67433 6.35226 8.60224L13.4773 1.47724Z"
            fill="#F9F9F9"
          />
        </svg>
      )}
      {/* delete */}
      {isHovered && (
        <svg
          style={{ marginLeft: "10px" }}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.6875 4.5C1.6875 4.18934 1.93934 3.9375 2.25 3.9375H15.75C16.0607 3.9375 16.3125 4.18934 16.3125 4.5C16.3125 4.81066 16.0607 5.0625 15.75 5.0625H2.25C1.93934 5.0625 1.6875 4.81066 1.6875 4.5Z"
            fill="#F05454"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 2.0625C7.25136 2.0625 7.0129 2.16127 6.83709 2.33709C6.66127 2.5129 6.5625 2.75136 6.5625 3V3.9375H11.4375V3C11.4375 2.75136 11.3387 2.5129 11.1629 2.33709C10.9871 2.16127 10.7486 2.0625 10.5 2.0625H7.5ZM12.5625 3.9375V3C12.5625 2.45299 12.3452 1.92839 11.9584 1.54159C11.5716 1.1548 11.047 0.9375 10.5 0.9375H7.5C6.95299 0.9375 6.42839 1.1548 6.04159 1.54159C5.6548 1.92839 5.4375 2.45299 5.4375 3V3.9375H3.75C3.43934 3.9375 3.1875 4.18934 3.1875 4.5V15C3.1875 15.547 3.4048 16.0716 3.79159 16.4584C4.17839 16.8452 4.70299 17.0625 5.25 17.0625H12.75C13.297 17.0625 13.8216 16.8452 14.2084 16.4584C14.5952 16.0716 14.8125 15.547 14.8125 15V4.5C14.8125 4.18934 14.5607 3.9375 14.25 3.9375H12.5625ZM4.3125 5.0625V15C4.3125 15.2486 4.41127 15.4871 4.58709 15.6629C4.7629 15.8387 5.00136 15.9375 5.25 15.9375H12.75C12.9986 15.9375 13.2371 15.8387 13.4129 15.6629C13.5887 15.4871 13.6875 15.2486 13.6875 15V5.0625H4.3125Z"
            fill="#F05454"
          />
        </svg>
      )}
    </div>
  );
};

const ProgressCircle = ({ label, count, ...props }) => {
  return (
    <div className="progress-circle">
      <h4>{label}</h4>
      <div>
        <p>{count}</p>
        <p>задач</p>
      </div>
    </div>
  );
};

const ProjectPage = ({ ...props }) => {
  const [composerIsOpen, setComposerOpen] = useState(false);

  const { projectId } = useParams();
  return (
    <div className="project-page">
      <div className="header">
        <button onClick={() => setComposerOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
              stroke="#FAFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6.40002V13.6"
              stroke="#FAFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.40002 10H13.6"
              stroke="#FAFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Новая задача</p>
        </button>
      </div>
      <div className="project-body">
        <div className="project-tasks">
          <h3>Активные задачи</h3>
          {mockArray
            .filter((t) => !t.status)
            .map((task, i) => (
              <TaskLine
                key={i}
                name={task.name}
                id={task.id}
                status={task.status}
              />
            ))}
          <h3>Завершенные задачи</h3>
          {mockArray
            .filter((t) => t.status)
            .map((task, i) => (
              <TaskLine
                key={i}
                name={task.name}
                id={task.id}
                status={task.status}
              />
            ))}
        </div>
        <div className="project-info">
          <div className="project-progress">
            <h3>Успехи в проекте </h3>
            <div>
              <ProgressCircle label={"Создано"} count={15} />
              <ProgressCircle label={"Завершено"} count={5} />
              <ProgressCircle label={"В процессе"} count={10} />
            </div>
          </div>
          <div className="project-description">
            <h3>Описание проекта</h3>
            <p>
              Человек, который просыпается в 6 утра, по статистике, закрывает
              все задачи к 18:00 вечера. Попробуем также 🤔?
            </p>
          </div>
        </div>
      </div>

      {composerIsOpen && (
        <TaskComposer isOpen={composerIsOpen} setOpen={setComposerOpen} />
      )}
    </div>
  );
};

export default ProjectPage;
