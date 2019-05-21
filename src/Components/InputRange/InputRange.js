import React from "react";

import "./InputRange.scss";

const InputRange = ({
  defaultValue,
  endDesc,
  idAndName,
  inputDesc,
  min,
  max,
  startDesc
}) => {
  return (
    <div className="input-range-container-outer">
      <label
        htmlFor={idAndName ? idAndName : "input-range"}
        className="input-range-description"
      >
        {inputDesc ? inputDesc : null}
      </label>
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
          id={idAndName ? idAndName : "input-range"}
          name={idAndName ? idAndName : "input-range"}
        />
        <p className="input-range-label-end">{endDesc ? endDesc : null}</p>
      </div>
    </div>
  );
};

export default InputRange;
