import React from "react";
import "./InputText.scss";
const InputText = ({
  defaultValue,
  inputLabel,
  onChange,
  placeholder,
  idAndName
}) => {
  return (
    <div className="input-container-text">
      {inputLabel && (
        <label
          className="input-text-label"
          htmlFor={idAndName ? idAndName : "input-text"}
        >
          {inputLabel}
        </label>
      )}
      <input
        className="input-text"
        id={idAndName ? idAndName : "input-text"}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        name={idAndName ? idAndName : "input-text"}
      />
    </div>
  );
};

export default InputText;
