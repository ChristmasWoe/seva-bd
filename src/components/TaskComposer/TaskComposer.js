import React, { useState, useEffect } from "react";
import "./TaskComposer.css";
import Modal from "react-awesome-modal";
import { useSnackbar } from "notistack";
import DropDown from "../shared/DropDown/DropDown";
import {useSelector,useDispatch} from "react-redux"
import axios from "axios";
import {Config} from '../../config'

const TaskComposer = ({ isOpen, setOpen,tid,refresher, tspr,tslb, ...props }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [taskName, setTaskName] = useState("");
  const [taskProject,setTaskProject] = useState(tspr||"");
  const [taskLabels,setTaskLabels] = useState(tslb&&tslb.length?tslb:[]);
  const [taskStatus,setTaskStatus] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(state=>state.ProjectReducer.projects)
  const labels = useSelector(state=>state.LabelsReducer.labels)


  useEffect(()=>{
    const getTask = async () => {
      const bfd = new FormData();
      bfd.set("task_id",tid);
      axios.post(Config.url+"task/get",bfd).then(res=>{
        if(res&&res.data){
          setTaskName(res.data?.Name);
          setTaskProject(res.data?.ProjectId)
          setTaskLabels(res.data?.Labels)
          setTaskStatus(res.data?.Status)
        }
      })
    } 
    if(tid)getTask();
  },[])

  const onSave = e =>{
    e.preventDefault();
    let bfd = new FormData();
    bfd.set("name",taskName);
    bfd.set("project_id",taskProject);
    console.log("bfd.save",)
    bfd.set("labels",taskLabels.length?taskLabels.join(";"):"");
    if(tid){
      bfd.set("id",tid);
      bfd.set("status",taskStatus)
      axios.post(Config.url+"tasks/edit",bfd).then(res=>{
          if(res&&res.data){
            enqueueSnackbar("Задача успешно изменена",{
                variant: 'success',
            })
            setOpen(false);
            refresher()
            // getProjects(dispatch)
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
      axios.post(Config.url+"tasks/create",bfd).then(res=>{
          if(res&&res.data){
            enqueueSnackbar("Задача успешно создана",{
                variant: 'success',
            })
            setOpen(false);
            refresher()
            // getProjects(dispatch)
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
  console.log("labels",taskLabels)

  return (
    <Modal
      visible={isOpen}
      width="700"
      height="350"
      effect="fadeInUp"
      onClickAway={() => setOpen(false)}
    >
      <div className="task-composer">
        <div className="task-composer-header">
          <h3>Добавить новую задачу</h3>
        </div>
        <div style={{ marginTop: "30px" }} className="task-composer-input">
          <p>Что нужно сделать?</p>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Приготовить ужин"
          />
        </div>

        <div style={{marginTop:"34px"}} className="task-composer-select-line">

          <div className="task-composer-dropdown">
            <p>Выбор проекта</p>
            <DropDown
              defaultValue={taskProject}
              options={projects.map(pr=>({name:pr.Name,value:pr.Id}))}
              onPick={(v) => setTaskProject(v)}
            />
          </div>
          <div className="task-composer-dropdown">
            <p>Выбор метки</p>
            <DropDown
              defaultValue={taskLabels}
              isMultuiple={true}
              options={(labels.map(lb=>({name:lb.Name,value:lb.Id})))}
              onPick={(v) =>setTaskLabels(v)}
            />
          </div>
        </div>

        <div className="task-composer-footer">
          <button
            onClick={(e) => setOpen(false)}
            style={{ backgroundColor: "#F05454" }}
          >
            Отменить
          </button>
          <button onClick={onSave} disabled={taskName.trim()==""} style={{ backgroundColor: "#29A19C", marginLeft: "auto" }}>
            {tid?"Изменить":"Добавить"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskComposer;
