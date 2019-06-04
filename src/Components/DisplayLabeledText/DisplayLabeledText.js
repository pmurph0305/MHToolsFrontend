import React from "react";

import "./DisplayLabeledText.scss";

const DisplayLabeledText = ({ label, text }) => {
  return (
    <div className="dlt-container">
      <label className="dlt-label">{label}</label>
      <p className="dlt-text">{text}</p>
    </div>
  );
};

export default DisplayLabeledText;
