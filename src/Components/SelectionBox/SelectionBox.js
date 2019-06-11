import React from "react";
import PropTypes from "prop-types";
import "./SelectionBox.scss";

/**
 * SelectionBox - returns a select input element with options
 * Creates a select element with the parameters passed in.
 * Uses options array index as key & value for options.
 * @param {[string]} options array of strings displayed in the selection box.
 * @param {string}   id        id of the select element.
 * @param {string}   label     label used for label and aria-label attributes.
 * @param {string}   className css className for select element. Default if not specified.
 * @callback onChange  onChange function when selection is changed.
 * @param {number}   value     default value of select element.
 */
const SelectionBox = ({ options, id, label, onChange, value, className }) => {
  return (
    <select
      id={id}
      onChange={onChange}
      value={value}
      className={className}
      label={label}
      aria-label={label}
    >
      {options
        ? options.map((option, index) => {
            return (
              <option value={index} key={index}>
                {option}
              </option>
            );
          })
        : null}
    </select>
  );
};

SelectionBox.defaultProps = {
  className: "DefaultSelect"
};

SelectionBox.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};

export default SelectionBox;
