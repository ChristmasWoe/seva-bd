import React, { useState, useEffect } from "react";
import "./TaskComposer.css";
import Modal from "react-awesome-modal";
import { useSnackbar } from "notistack";
import DropDown from "../shared/DropDown/DropDown";

const TaskComposer = ({ isOpen, setOpen, tsname = "", ...props }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [taskName, setTaskName] = useState(tsname);

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
              defaultValue={0}
              options={[
                { name: "nik1", value: 0 },
                { name: "nik2", value: 1 },
                { name: "nik3", value: 2 },
                { name: "nik4", value: 3 },
              ]}
              onPick={(v) => console.log("new value", v)}
            />
          </div>
          <div className="task-composer-dropdown">
            <p>Выбор метки</p>
            <DropDown
              defaultValue={0}
              options={[
                { name: "Не выбрано", value: 0 },
                { name: "nik2", value: 1 },
                { name: "nik3", value: 2 },
                { name: "nik4", value: 3 },
              ]}
              onPick={(v) => console.log("new value", v)}
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
          <button style={{ backgroundColor: "#29A19C", marginLeft: "auto" }}>
            Добавить
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskComposer;
