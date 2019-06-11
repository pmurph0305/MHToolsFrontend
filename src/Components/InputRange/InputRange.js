import React from "react";
import PropTypes from "prop-types";
import "./InputRange.scss";
/**
 * InputRange - Returns a component that displays a customized range field, allowing values between min & max, with labels above & on the ends of the range.
 * @param  {number} defaultValue default value of the range element
 * @param  {string} idAndName id & name of the range element
 * @param  {string} inputLabel label displayed above the range
 * @param  {number} min min value allowed in the range
 * @param  {string} minLabel text displayed beside the start of the range
 * @param  {number} max max value allowed in the range
 * @param  {string} maxLabel text displayed beside the end of the range
 */
const InputRange = ({
  defaultValue,
  idAndName,
  inputLabel,
  min,
  minLabel,
  max,
  maxLabel
}) => {
  return (
    <div className="input-range-container-outer">
      {inputLabel && (
        <label htmlFor={idAndName} className="input-range-label">
          {inputLabel}
        </label>
      )}

      <div className="input-range-container">
        {minLabel && <p className="input-range-label-start">{minLabel}</p>}

        <input
          className="input-range"
          type="range"
          min={min ? min : 0}
          max={max ? max : 100}
          defaultValue={
            defaultValue
              ? defaultValue
              : min && max
              ? parseInt((min + max) / 2)
              : 50
          }
          id={idAndName}
          name={idAndName}
        />
        {maxLabel && <p className="input-range-label-end">{maxLabel}</p>}
      </div>
    </div>
  );
};

InputRange.defaultProps = {
  min: 0,
  max: 100,
  idAndName: "input-range"
};

InputRange.propTypes = {
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  idAndName: PropTypes.string,
  inputLabel: PropTypes.string,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string
};

export default InputRange;
