import React from "react";
import PropTypes from "prop-types";
import "./SignInForm.scss";

/** SignInForm form - returns a component that renders a signin form
 * @callback onSubmitForm called when the user clicks the submit button
 * @callback onToggleModal called when the user clicks the close (X) button on the modal.
 */
const SignInForm = ({ onSubmitForm, onToggleModal }) => {
  return (
    <div className="form-container">
      <form className="form-modal" onSubmit={onSubmitForm}>
        <div className="modal-close" onClick={onToggleModal}>
          &times;
        </div>
        <div className="form-flex-container">
          <h1 className="form-title">Sign in</h1>
          <div className="form-entries-container">
            <div className="form-input-container">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                autoComplete="email"
                className="form-input"
                type="text"
                placeholder="Example@gmail.com"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="form-input-container">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                autoComplete="current-password"
                className="form-input"
                type="password"
                placeholder="password"
                name="password"
                id="password"
                required
              />
            </div>
            <input
              type="hidden"
              id="hiddenFormEl"
              name="hidden"
              value="hiddenValue"
            />
            <input className="form-submit" type="submit" value="Sign in" />
          </div>
        </div>
      </form>
    </div>
  );
};

SignInForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired
};

export default SignInForm;
