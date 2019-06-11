import React from "react";
import PropTypes from "prop-types";
import debounce from "../../HelperScripts/debounce";
import "./InputTextArea.scss";

/**
 * InputTextArea - Returns a component that is a text area with a label & description that automatically resizes as a user types.
 * @param  {string} idAndName id and name of the textarea element.
 * @param  {string} inputLabel label displayed above the text area element.
 * @param  {string} inputDesc description of what the inputfield is for
 * @param  {string} placeholder placeholder text to display inside of the text area
 */

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
              <label className="input-textarea-label" htmlFor={idAndName}>
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
          id={idAndName}
          type="text"
          placeholder={placeholder}
          name={idAndName}
          onChange={this.onTextAreaChange}
        />
      </div>
    );
  }
}

InputTextArea.defaultProps = {
  idAndName: "form-input-textarea",
  placeholder: ""
};

InputTextArea.propTypes = {
  idAndName: PropTypes.string,
  inputLabel: PropTypes.string,
  inputDesc: PropTypes.string,
  placeholder: PropTypes.string
};

export default InputTextArea;
