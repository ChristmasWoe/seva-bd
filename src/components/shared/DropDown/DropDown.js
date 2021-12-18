import React,{useState, useEffect} from "react";
import "./DropDown.css";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';


const DropDown = ({defaultValue,options,onPick,...props}) => {
    const [currentValue,setCurrentValue] = useState(defaultValue);

    const handleChange = value => {
        setCurrentValue(value);
        onPick&&onPick(value);
    }

    return (
        <UncontrolledDropdown>
        <DropdownToggle caret>
          {options.find(op=>op.value==currentValue)?.name||""}
        </DropdownToggle>
        <DropdownMenu>
        {options.map((op,i)=><DropdownItem onClick={e=>handleChange(op.value)} key={i}>
                
                {op.name}</DropdownItem>)}
        </DropdownMenu>
      </UncontrolledDropdown>


        // <select className="drop-down" value={currentValue} onChange={handleChange}>
          
        // </select>
    )
}

export default DropDown;