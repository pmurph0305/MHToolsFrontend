import React from "react";
import "./InputCheckbox.scss";

const InputCheckbox = ({ idAndName, label }) => {
  return (
    <label className="input-checkbox-container">
      <input
        type="checkbox"
        className="input-checkbox"
        id={idAndName}
        name={idAndName}
      />
      <span className="input-checkbox-span" />
      <p className="input-checkbox-label">{label}</p>
    </label>
  );
};

export default InputCheckbox;
