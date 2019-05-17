import React from "react";
import "./SignInForm.scss";

const SignInForm = ({ onSubmitForm, onToggleModal }) => {
  return (
    <div className="form-container">
      <form className="form-modal" onSubmit={onSubmitForm}>
        <div className="modal-close" onClick={onToggleModal}>
          &times;
        </div>
        <h1>Sign in</h1>
        <div className="form-input-container">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Example@gmail.com"
            name="email"
            required
          />
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-input"
            type="password"
            placeholder="password"
            name="password"
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
      </form>
    </div>
  );
};

export default SignInForm;
