import React from "react";
import PropTypes from "prop-types";
import "./InputField.scss";
/**
 * InputField - Returns a component that displays a text input field, with a button beside it.
 * @param  {string} placeholder text placeholder for text input
 * @param  {string} buttonTitle text to display on button
 * @callback onClick onClick event handler, is passed the current text field element.
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
      <button value="add_task" onClick={handleClick} className="AddTaskButton">
        {buttonTitle}
      </button>
    </div>
  );
};

InputField.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default InputField;
