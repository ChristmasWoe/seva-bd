import React, { useState, useEffect } from "react";
import "./DeleteModal.css";
import "../TaskComposer/TaskComposer.css"
import Modal from "react-awesome-modal";
import { useSnackbar } from "notistack";
import axios from "axios";
import {Config} from '../../config'

const DeleteModal = ({ tid,tsname,setOpen,isOpen,refresher, ...props }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onDelete = e =>{
    e.preventDefault();
    let bfd = new FormData();
      bfd.set("task_id",tid);
      axios.post(Config.url+"task/delete",bfd).then(res=>{
        console.log("Task deleted",res)  
        if(res&&res.data){
            enqueueSnackbar("Задача удалена",{
                variant: 'warning',
            })
            setOpen(null);
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
 

  return (
    <Modal
      visible={isOpen}
      width="500"
      height="200"
      effect="fadeInUp"
      onClickAway={() => setOpen(null)}
    >
      <div className="task-composer">
        <div className="task-composer-header">
          <h3>Удалить задачу</h3>
        </div>
        <div style={{ marginTop: "30px" }} className="task-composer-input">
          <p style={{fontWeight: "normal"}}>Вы действительно хотите удалить задачу: <br/> <b>{tsname}</b> </p>
         
        </div>

        <div className="task-composer-footer">
          <button
            onClick={(e) => setOpen(null)}
            style={{ backgroundColor: "#29A19C" }}
          >
            Отменить
          </button>
          <button onClick={onDelete} style={{backgroundColor: "#F05454" , marginLeft: "auto" }}>
            Удалить
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
