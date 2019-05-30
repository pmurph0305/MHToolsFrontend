import React from "react";

import "./DisplayTextBox.scss";

const DisplayTextBox = ({ text, label, idAndName }) => {
  return (
    <div className="textbox-container">
      <label className="textbox-label" htmlFor={idAndName}>
        {label}
      </label>
      <p className="textbox-text" id={idAndName} name={idAndName}>
        {text}
      </p>
    </div>
  );
};
export default DisplayTextBox;
