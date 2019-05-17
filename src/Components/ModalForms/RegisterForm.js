import React from "react";
import "./SignInForm.scss";

const RegisterForm = ({ onSubmitForm, onToggleModal }) => {
  return (
    <div className="form-container">
      <form className="form-modal" onSubmit={onSubmitForm}>
        <div className="modal-close" onClick={onToggleModal}>
          &times;
        </div>
        <h1>Register</h1>

        <div className="form-input-container">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="email"
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
        <div className="form-input-container">
          <label className="form-label" htmlFor="password2">
            Re-enter Password:
          </label>
          <input
            className="form-input"
            type="password"
            placeholder="password"
            name="password2"
            required
          />
        </div>
        <input
          type="hidden"
          id="hiddenFormEl"
          name="hidden"
          value="hiddenValue"
        />
        <input className="form-submit" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
