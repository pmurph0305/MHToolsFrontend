import React from "react";
import PropTypes from "prop-types";

import "./DisplayLabeledText.scss";

const DisplayLabeledText = ({ label, text }) => {
  return (
    <div className="dlt-container">
      <label className="dlt-label">{label}</label>
      <p className="dlt-text">{text}</p>
    </div>
  );
};

DisplayLabeledText.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default DisplayLabeledText;
