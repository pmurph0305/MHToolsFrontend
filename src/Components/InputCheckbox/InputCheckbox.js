import React from "react";
import PropTypes from "prop-types";
import "./InputCheckbox.scss";
/**
 * InputCheckbox - Returns a customized checkbox that displays the label beside it.
 * @param  {string} idAndName id & name property of the input type checkbox.
 * @param  {string} label label displayed for the checkbox.
 */
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

InputCheckbox.propTypes = {
  idAndName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputCheckbox;
