import { loginUser, logoutUser } from "./Redux/app_actions";

import Modal from "../../Components/Modal/Modal";
import RegisterForm from "../../Components/ModalForms/RegisterForm";
import AppRouter from "../AppRouter/AppRouter";
import SignInForm from "../../Components/ModalForms/SignInForm";

import React, { Component } from "react";
import { connect } from "react-redux";

import { SERVER_URL } from "../../Constants/constants";

import "./App.scss";

const mapStateToProps = state => {
  return {
    user_id: state.appReducer.user_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: id => dispatch(loginUser(id)),
    onLogoutUser: () => dispatch(logoutUser())
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      formDisplayed: "",
      isModalOpen: false,
      phq9_result: ""
    };
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      // Verify token, don't just immediately call onLoginUser.
      fetch(SERVER_URL + "signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(response => {
          if (Number.isInteger(Number.parseInt(response.id))) {
            this.props.onLoginUser(response.id);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onSetFormDisplayed = formDisplayed => {
    this.setState(prevState => ({ ...prevState, formDisplayed }));
  };

  onSubmitPHQ9 = data => {
    let score = data.reduce((acc, cur, i) => (i < 9 ? acc + cur : acc));
    let token = window.sessionStorage.getItem("token");
    fetch(SERVER_URL + "phq9/" + this.props.user_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        scores: data,
        score: score
      })
    })
      .then(response => response.json())
      .then(response => this.setState({ phq9_result: response }))
      .catch(err => console.log(err));
  };

  onSignin = (email, password, hidden) => {
    fetch(SERVER_URL + "signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        hidden: hidden
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token && data.id) {
          window.sessionStorage.setItem("token", data.token);
          this.onToggleModal();
          this.props.onLoginUser(data.id);
        } else {
          this.setState({ formError: "Error signing in." });
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  onSubmitSigninForm = e => {
    e.preventDefault();
    if (
      e.target.elements[0].value &&
      e.target.elements[1].value &&
      e.target.elements[2].value
    ) {
      this.onSignin(
        e.target.elements[0].value,
        e.target.elements[1].value,
        e.target.elements[2].value
      );
    }
  };

  onRegister = (username, email, password, hidden) => {
    fetch(SERVER_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        hidden: hidden
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token && data.id) {
          window.sessionStorage.setItem("token", data.token);
          this.onToggleModal();
          this.props.onLoginUser(data.id);
        }
      });
  };

  onSubmitRegisterForm = e => {
    e.preventDefault();
    if (
      e.target.elements[0].value &&
      e.target.elements[1].value &&
      e.target.elements[2].value &&
      e.target.elements[3].value
    ) {
      if (e.target.elements[2].value !== e.target.elements[3].value) {
        return this.setFormError("Passwords do not match.");
      } else if (e.target.elements[0].value.length > 255) {
        return this.setFormError("Username is too long");
      } else if (e.target.elements[1].value.length > 255) {
        return this.setFormError("Email is too long");
      } else if (e.target.elements[2].value.length > 255) {
        return this.setFormError("Password is too long");
      }
      this.onRegister(
        e.target.elements[1].value,
        e.target.elements[0].value,
        e.target.elements[2].value,
        e.target.elements[4].value
      );
    }
  };

  setFormError = formError => {
    this.setState(prevState => ({
      ...prevState,
      formError
    }));
  };

  onToggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalOpen: !prevState.isModalOpen
    }));
  };

  onSignOut = () => {
    window.sessionStorage.removeItem("token");
    this.props.onLogoutUser();
  };

  onModalChange = modalType => {
    if (modalType === "signout") {
      this.onSignOut();
    } else {
      this.setState(prevState => ({
        ...prevState,
        isModalOpen: !prevState.isModalOpen,
        formDisplayed: modalType
      }));
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.isModalOpen && (
          <Modal>
            {this.state.formDisplayed === "signin" ? (
              <SignInForm
                onSubmitForm={this.onSubmitSigninForm}
                onToggleModal={this.onToggleModal}
                formError={this.state.formError}
              />
            ) : (
              <RegisterForm
                onSubmitForm={this.onSubmitRegisterForm}
                onToggleModal={this.onToggleModal}
                formError={this.state.formError}
              />
            )}
          </Modal>
        )}
        <AppRouter
          user_id={this.props.user_id}
          onModalChange={this.onModalChange}
          onSubmitPHQ9={this.onSubmitPHQ9}
          submissionResult={this.state.phq9_result}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
