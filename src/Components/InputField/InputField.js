import React from "react";
import "./InputField.scss";
/**
 * @param  {EventListener} onClick onClick event handler
 * @param  {string} placeholder text placeholder for text input
 * @param  {string} buttonTitle text to display on button
 */

const InputField = ({ onClick, placeholder, buttonTitle }) => {
  let textInput = React.createRef();
  function handleClick() {
    onClick(textInput.current);
  }

  return (
    <div className="InputContainer">
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
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default InputField;
