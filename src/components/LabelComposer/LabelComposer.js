import React, { useState, useEffect } from "react";
// import "./TaskComposer.css";
import Modal from "react-awesome-modal";
import { useSnackbar } from "notistack";
import { Config } from "../../config";
import axios from "axios"
import "../TaskComposer/TaskComposer.css";
import {useDispatch} from "react-redux";
import {getLabels} from "../../redux/actions/LabelActions"

const LabelComposer = ({ isOpen, setOpen,ln,ld,lc, lid, ...props }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [labelName, setLabelName] = useState(ln||"");
  const [labelDescription, setLabelDescription] = useState(ld||"");
  const [labelColor, setLabelColor] = useState(lc||Config.colors[0]);
  const dispatch = useDispatch();

  const onSave = e =>{
      e.preventDefault();
      let bfd = new FormData();
      bfd.set("name",labelName);
      bfd.set("description",labelDescription);
      bfd.set("color",labelColor);
      if(lid){
        bfd.set("id",lid);
        axios.post(Config.url+"labels/edit",bfd).then(res=>{
            if(res&&res.data){
              enqueueSnackbar("Метка успешно изменена",{
                  variant: 'success',
              })
              setOpen(false);
              getLabels(dispatch)
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
        axios.post(Config.url+"labels/create",bfd).then(res=>{
            if(res&&res.data){
              enqueueSnackbar("Метка успешно создана",{
                  variant: 'success',
              })
              setOpen(false);
              getLabels(dispatch)
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
          <h3>Создать новую метку</h3>
          <div className="composer-palette">
            {Config.colors.map((c, i) => (
              <div
                className={`color-button ${c == labelColor ? "active" : ""}`}
                onClick={(e) => setLabelColor(c)}
                key={i}
                style={{ background: c }}
              >
                {c == labelColor ? (
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
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
            placeholder="Топ приоритет"
          />
        </div>

        <div style={{ marginTop: "30px" }} className="task-composer-input">
          <p>Описание</p>
          <input
            value={labelDescription}
            onChange={(e) => setLabelDescription(e.target.value)}
            placeholder="Задачи с наивысшим приоритетом"
          />
        </div>

        <div className="task-composer-footer">
          <button
            onClick={(e) => setOpen(false)}
            style={{ backgroundColor: "#F05454" }}
          >
            Отменить
          </button>
          <button onClick={onSave} disabled={labelName.trim()==""} style={{ backgroundColor: "#29A19C", marginLeft: "auto" }}>
            {lid?"Изменить":"Добавить"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LabelComposer;
