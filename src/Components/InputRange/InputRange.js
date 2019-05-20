import React from "react";

import "./InputRange.scss";

const InputRange = ({
  startDesc,
  endDesc,
  inputDesc,
  min,
  max,
  defaultValue
}) => {
  return (
    <div className="input-range-container-range">
      <p className="input-range-description">{inputDesc ? inputDesc : null}</p>
      <div className="input-range-container">
        <p className="input-range-label-start">
          {startDesc ? startDesc : null}
        </p>
        <input
          className="input-range"
          type="range"
          min={min ? min : 0}
          max={max ? max : 100}
          defaultValue={defaultValue ? defaultValue : 50}
          id="cbtAutomaticThoughtsBelief"
          name="cbtAutomaticThoughtsBelief"
        />
        <p className="input-range-label-end">{endDesc ? endDesc : null}</p>
      </div>
    </div>
  );
};

export default InputRange;
