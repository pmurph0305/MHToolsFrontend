import React from "react";

import "./InputRange.scss";

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
        <label
          htmlFor={idAndName ? idAndName : "input-range"}
          className="input-range-label"
        >
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
          id={idAndName ? idAndName : "input-range"}
          name={idAndName ? idAndName : "input-range"}
        />
        {maxLabel && <p className="input-range-label-end">{maxLabel}</p>}
      </div>
    </div>
  );
};

export default InputRange;
