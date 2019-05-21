import React from "react";
import "./InputText.scss";
const InputText = ({
  defaultValue,
  inputDesc,
  onChange,
  placeholder,
  idAndName
}) => {
  return (
    <div className="input-container-text">
      <label
        className="input-text-description"
        htmlFor={idAndName ? idAndName : "input-text"}
      >
        {inputDesc}
      </label>
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
