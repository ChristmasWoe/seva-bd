import React, { useState, useEffect } from "react";
// import "./TaskComposer.css";
import Modal from "react-awesome-modal";
import { useSnackbar } from "notistack";
import { Config } from "../../config";
import axios from "axios"
import "../TaskComposer/TaskComposer.css";
import {useDispatch} from "react-redux";
import {getProjects} from "../../redux/actions/ProjectActions"

const ProjectComposer = ({ isOpen, setOpen,pn,pd,pc, pid,...props }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [projectName, setProjectName] = useState(pn||"");
  const [projectDescription, setProjectDescription] = useState(pd||"");
  const [projectColor, setProjectColor] = useState(pc||Config.colors[0]);
  const dispatch = useDispatch();

  const onSave = e =>{
      e.preventDefault();
      let bfd = new FormData();
      bfd.set("name",projectName);
      bfd.set("description",projectDescription);
      bfd.set("color",projectColor);
      if(pid){
        bfd.set("id",pid);
        axios.post(Config.url+"projects/edit",bfd).then(res=>{
            if(res&&res.data){
              enqueueSnackbar("Проект успешно изменен",{
                  variant: 'success',
              })
              setOpen(false);
              getProjects(dispatch)
            }else{
              enqueueSnackbar("Что-то пошло не так",{
                  variant: 'error',
              })
            }
        }).catch(e=>{
          enqueueSnackbar("Что-то пошло не так",{
              variant: 'error',
          })
        })
      }else{
        axios.post(Config.url+"projects/create",bfd).then(res=>{
            if(res&&res.data){
              enqueueSnackbar("Проект успешно создан",{
                  variant: 'success',
              })
              setOpen(false);
              getProjects(dispatch)
            }else{
              enqueueSnackbar("Что-то пошло не так",{
                  variant: 'error',
              })
            }
        }).catch(e=>{
          enqueueSnackbar("Что-то пошло не так",{
              variant: 'error',
          })
        })
      }
    }

  return (
    <Modal
      visible={isOpen}
      width="540"
      height="350"
      effect="fadeInUp"
      onClickAway={() => setOpen(false)}
    >
      <div className="task-composer">
        <div className="project-composer-header">
          <h3>Создать новый проект</h3>
          <div className="composer-palette">
            {Config.colors.map((c, i) => (
              <div
                className={`color-button ${c == projectColor ? "active" : ""}`}
                onClick={(e) => setProjectColor(c)}
                key={i}
                style={{ background: c }}
              >
                {c == projectColor ? (
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 7L11 1"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "30px" }} className="task-composer-input">
          <p>Название</p>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Учеба"
          />
        </div>

        <div style={{ marginTop: "30px" }} className="task-composer-input">
          <p>Описание</p>
          <input
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Все касательно учебы, домашнее задание итд."
          />
        </div>

        <div className="task-composer-footer">
          <button
            onClick={(e) => setOpen(false)}
            style={{ backgroundColor: "#F05454" }}
          >
            Отменить
          </button>
          <button onClick={onSave} disabled={projectName.trim()==""} style={{ backgroundColor: "#29A19C", marginLeft: "auto" }}>
           {pid?"Изменить":"Добавить"} 
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectComposer;
