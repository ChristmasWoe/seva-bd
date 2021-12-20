import React, { useState, useEffect } from "react";
import "./DropDown.css";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropDown = ({ defaultValue, options, onPick, isMultuiple, ...props }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const handleChange = (value) => {
    if(isMultuiple){
      console.log("inc",options,currentValue,value,currentValue.concat(value))
      if(currentValue.includes(value))return
      setCurrentValue(currentValue.concat(value));
      onPick && onPick(currentValue.concat(value));
    }else{
      setCurrentValue(value);
      onPick && onPick(value);
    }
  };

  useEffect(() => {
    setCurrentValue(defaultValue);
  },[defaultValue])

  console.log("zxc",currentValue,currentValue!=[]);
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        {
        currentValue!=undefined && currentValue?.length?
        isMultuiple
          ? options
              .filter((op) => currentValue.includes(op.value))
              .map((op,i) => (
                <div key={i} className="chip">
                  {op.name}
                  <svg
                  style={{marginLeft:"4px"}}
                    onClick={e=>{console.log("clear");setCurrentValue(currentValue.filter(co=>co!=op.value));onPick(currentValue.filter(co=>co!=op.value))}}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
                  </svg>
                </div>
              ))
          : options.find((op) => op.value == currentValue)?.name || "":"Не выбрано"}
      </DropdownToggle>
      <DropdownMenu>
        {options.map((op, i) => (
          <DropdownItem onClick={(e) => handleChange(op.value)} key={i}>
            {op.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>

    // <select className="drop-down" value={currentValue} onChange={handleChange}>

    // </select>
  );
};

export default DropDown;
