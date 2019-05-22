import React from "react";
import debounce from "../../HelperScripts/debounce";
import "./InputTextArea.scss";

class InputTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.resizeDebounce = debounce(this.onTextAreaChange, 150);
  }

  componentDidMount() {
    // Uses component did mount to set the height so that placeholders are displayed
    // completely without scrollbars.
    this.textArea.current.style.height = "5px";
    this.textArea.current.style.height =
      this.textArea.current.scrollHeight + this.getBottomPadding() + "px";
    // add an event listener for window resize to adjust height of text area as well.
    window.addEventListener("resize", this.resizeDebounce);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeDebounce);
  }

  onTextAreaChange = event => {
    this.textArea.current.style.height = "5px";
    this.textArea.current.style.height =
      this.textArea.current.scrollHeight + this.getBottomPadding() + "px";
  };

  getBottomPadding = () => {
    return parseInt(
      window
        .getComputedStyle(this.textArea.current)
        .getPropertyValue("padding-bottom")
    );
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
          ref={this.textArea}
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
