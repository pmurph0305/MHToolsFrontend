import React from "react";

import InputCheckbox from "../InputCheckbox/InputCheckbox";

import "./InputCheckboxList.scss";

class InputCheckboxList extends React.Component {
  render() {
    const { checkboxList, inputLabel, inputDesc } = this.props;

    return (
      <div className="input-checkbox-list-container-outer">
        {(inputLabel || inputDesc) && (
          <div className="input-checkbox-list-labels">
            {inputLabel && (
              <p className="input-checkbox-list-label">{inputLabel}</p>
            )}
            {inputDesc && (
              <p className="input-checkbox-list-description">{inputDesc}</p>
            )}
          </div>
        )}

        {checkboxList && Array.isArray(checkboxList) && (
          <div className="input-checkbox-list-container">
            {checkboxList.map(item => {
              return <InputCheckbox label={item} key={item} idAndName={item} />;
            })}
          </div>
        )}
      </div>
    );
  }
}

export default InputCheckboxList;
