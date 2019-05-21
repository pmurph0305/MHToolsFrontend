import React from "react";
import "./InputCheckbox.scss";

const InputCheckbox = ({ label }) => {
  return (
    <label className="input-checkbox-container">
      <input type="checkbox" className="input-checkbox" />
      <span className="input-checkbox-span" />
      <p className="input-checkbox-label">{label}</p>
    </label>
  );
};

export default InputCheckbox;
