import React from "react";

const TextBox = ({ text }) => {
  return (
    <div className="textbox-container">
      <p className="textbox-text">{text}</p>
    </div>
  );
};

export default TextBox;
