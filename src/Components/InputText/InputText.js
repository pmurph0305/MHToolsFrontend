import React from "react";
import PropTypes from "prop-types";

import "./InputText.scss";
/**
 * InputText - Returns a component that is a text inputfield with a label beside it.
 * @param  {string} defaultValue default value for input field.
 * @param  {string} inputLabel label displayed above input field.
 * @param  {string} placeholder placeholder displayed in input field.
 * @param  {string} idAndName id & name attribute for input element.
 * @callback  onChange onChange event handler for input field.
 */
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
        <label className="input-text-label" htmlFor={idAndName}>
          {inputLabel}
        </label>
      )}
      <input
        className="input-text"
        id={idAndName}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        name={idAndName}
      />
    </div>
  );
};

InputText.defaultProps = {
  idAndName: "input-text"
};

InputText.propTypes = {
  onChange: PropTypes.func,
  inputLabel: PropTypes.string,
  idAndName: PropTypes.string,
  placeholder: PropTypes.string,
  defauleValue: PropTypes.string
};

export default InputText;
