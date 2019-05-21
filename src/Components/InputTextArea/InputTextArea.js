import React from "react";
import "./InputTextArea.scss";

class InputTextArea extends React.Component {
  onTextAreaChange = event => {
    event.target.style.height = "5px";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  render() {
    const { idAndName, inputDesc, inputExpl, placeholder } = this.props;
    return (
      <div className="input-container-textarea">
        <div className="input-textarea-labels">
          <label
            className="input-textarea-description"
            htmlFor={idAndName ? idAndName : "form-input-textarea"}
          >
            {inputDesc ? inputDesc : null}
          </label>
          <p className="input-textarea-explanation">
            {inputExpl ? inputExpl : null}
          </p>
        </div>

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
