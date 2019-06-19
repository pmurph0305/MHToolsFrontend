import React from "react";
import PropTypes from "prop-types";
import "./SignInForm.scss";
/** Register form - returns a component that renders a registration form
 * @param  {string} formError error text displayed on the form
 * @callback onSubmitForm called when the user clicks the submit button
 * @callback onToggleModal called when the user clicks the close (X) button on the modal.
 */
const RegisterForm = ({ onSubmitForm, onToggleModal, formError }) => {
  return (
    <div className="form-container">
      <form
        className="form-modal"
        action=""
        method="POST"
        onSubmit={onSubmitForm}
      >
        <div className="modal-close" onClick={onToggleModal}>
          &times;
        </div>
        <div className="form-flex-container">
          <h1 className="form-title">Register</h1>
          <div className="form-entries-container">
            <div className="form-input-container">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                autoComplete="email"
                className="form-input"
                type="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="form-input-container">
              <label className="form-label" htmlFor="username">
                Username:
              </label>
              <input
                className="form-input"
                type="text"
                name=""
                id=""
                required
              />
            </div>
            <div className="form-input-container">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                autoComplete="new-password"
                className="form-input"
                type="password"
                name="password"
                id="password"
                required
              />
            </div>
            <div className="form-input-container">
              <label className="form-label" htmlFor="password2">
                Re-enter Password:
              </label>
              <input
                autoComplete="new-password"
                className="form-input"
                type="password"
                name="password2"
                id="password2"
                required
              />
            </div>
            <input
              type="hidden"
              id="hiddenFormEl"
              name="hidden"
              value="hiddenValue"
            />
            {formError}
            <input className="form-submit" type="submit" value="Register" />
          </div>
        </div>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  formError: PropTypes.string
};

export default RegisterForm;
