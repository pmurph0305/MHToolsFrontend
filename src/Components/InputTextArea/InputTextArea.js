import React from "react";
import "./InputTextArea.scss";

class InputTextArea extends React.Component {
  onTextAreaChange = event => {
    event.target.style.height = "5px";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  render() {
    const { idAndName, inputLabel, inputDesc, placeholder } = this.props;
    return (
      <div className="input-container-textarea">
        {(inputLabel || inputDesc) && (
          <div className="input-textarea-labels">
            {inputLabel && (
              <label
                className="input-textarea-label"
                htmlFor={idAndName ? idAndName : "form-input-textarea"}
              >
                {inputLabel}
              </label>
            )}
            {inputDesc && (
              <p className="input-textarea-description">{inputDesc}</p>
            )}
          </div>
        )}
        <textarea
          className="form-input-textarea"
          id={idAndName ? idAndName : "form-input-textarea"}
          type="text"
          placeholder={placeholder ? placeholder : ""}
          name={idAndName ? idAndName : "form-input-textarea"}
          onChange={this.onTextAreaChange}
        />
      </div>
    );
  }
}

export default InputTextArea;
