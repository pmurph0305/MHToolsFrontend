import React from "react";
import "./InputTextArea.scss";

const InputTextArea = ({ inputDesc, inputExpl, placeholder, onTextChange }) => {
  return (
    <div className="input-container-textarea">
      <div className="input-textarea-labels">
        <p className="input-textarea-description">
          {inputDesc ? inputDesc : null}
        </p>
        <p className="input-textarea-explanation">
          {inputExpl ? inputExpl : null}
        </p>
      </div>

      <textarea
        className="form-input-textarea"
        type="text"
        placeholder={placeholder ? placeholder : ""}
        name="cbtAutomaticThoughts"
        onChange={onTextChange}
      />
    </div>
  );
};

export default InputTextArea;
