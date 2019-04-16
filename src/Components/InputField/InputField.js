import React from 'react';
import './InputField.scss'

const InputField = ({onClick, placeholder}) => {
    let textInput = React.createRef();
    function handleClick() {
        onClick(textInput.current);
    }

    return (
        <div className="pa2">
            <input 
                ref={textInput}
                placeholder={placeholder}
                id="newtask" 
                type="text" 
                label="New task text input"
                aria-label="New task text input"
                className="InputField"

            />
            <button 
                value="add_task"
                onClick={handleClick}
                 //onClick={() => onClick(document.getElementById("newtask").value)}
                className="AddTaskButton"
            >Add New Task</button>
        </div>
    )
}

export default InputField;