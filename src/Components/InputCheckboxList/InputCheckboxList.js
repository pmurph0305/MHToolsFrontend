import React from "react";
import PropTypes from "prop-types";
import InputCheckbox from "../InputCheckbox/InputCheckbox";

import "./InputCheckboxList.scss";

/**
 * InputCheckboxList - A component that displays a label & description above a list of items with checkboxs beside them.
 * @param {[string]} checkboxList Array of checkbox items to display, each item is the text to go beside the checkbox.
 * @param {string} inputLabel Label to be displayed
 * @param {string} inputDesc Description of what the list of checkboxs is for.
 */

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

InputCheckboxList.propTypes = {
  checkboxList: PropTypes.array.isRequired,
  inputLabel: PropTypes.string.isRequired,
  inputDesc: PropTypes.string
};

export default InputCheckboxList;
