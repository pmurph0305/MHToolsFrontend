import React from "react";
import PropTypes from "prop-types";

import "./DisplayLabeledText.scss";
/**
 * DisplayLabeledText - Returns a component that displays the label above text in a container.
 * @param  {string} label Label displayed above text
 * @param  {string} text  Text to be displayed
 */
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
