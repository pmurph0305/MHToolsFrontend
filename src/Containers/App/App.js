import { loginUser } from "./Redux/app_actions";
import CBT from "../CBT/CBT";
import CopingSkills from "../CopingSkills/CopingSkills";
import DailyMaintenance from "../DailyMaintenance/DailyMaintenance";
import History from "../History/History";
import Modal from "../../Components/Modal/Modal";
import RegisterForm from "../../Components/ModalForms/RegisterForm";
import SignInForm from "../../Components/ModalForms/SignInForm";
import NavBar from "../../Components/Navigation/NavBar";
import PHQ9 from "../PHQ9/PHQ9";
import React, { Component } from "react";
import { connect } from "react-redux";

import "tachyons";
import "./App.scss";

const serverURL = "http://localhost:3001";

const mapStateToProps = state => {
  return {
    user_id: state.appReducer.user_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: id => dispatch(loginUser(id))
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplayed: "",
      isModalOpen: false,
      route: "a",
      phq9_result: ""
    };
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      // Verify token, don't just immediately call onLoginUser.
      fetch(serverURL + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(response => {
          if (Number.isInteger(Number.parseInt(response))) {
            this.props.onLoginUser(response);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onRouteChange = route => {
    console.log("state from:", this.state.route);
    console.log("state to:", route);

    if (route === "signin") {
      this.onToggleModal();
      this.onSetFormDisplayed("signin");
      return;
    } else if (route === "register") {
      this.onToggleModal();
      this.onSetFormDisplayed("register");
      return;
    }
    this.setState({ route: route });
  };

  onSetFormDisplayed = formDisplayed => {
    this.setState(prevState => ({ ...prevState, formDisplayed }));
  };

  onSubmitPHQ9 = data => {
    let score = data.reduce((acc, cur, i) => (i < 9 ? acc + cur : acc));
    let token = window.sessionStorage.getItem("token");
    fetch(serverURL + "/phq9/" + this.props.user_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
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
    fetch(serverURL + "/signin", {
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
        console.log(data);
        if (data.token && data.id) {
          window.sessionStorage.setItem("token", data.token);
          this.onToggleModal();
          this.props.onLoginUser(data.id);
        } else {
          // Display error in modal like "Incorrect login info"
          // Track # of attempts,
          // Provide forgot your password eventually.
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

  onSubmitRegisterForm = e => {
    e.preventDefault();
    // register
  };

  onToggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalOpen: !prevState.isModalOpen
    }));
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
              />
            ) : (
              <RegisterForm
                onSubmitForm={this.onSubmitRegisterForm}
                onToggleModal={this.onToggleModal}
              />
            )}
          </Modal>
        )}

        <NavBar onRouteChange={this.onRouteChange} />
        {this.state.route === "phq9" ? (
          <PHQ9
            onSubmitPHQ9={this.onSubmitPHQ9}
            submissionResult={this.state.phq9_result}
          />
        ) : this.state.route === "cbt" ? (
          <CBT />
        ) : this.state.route === "dm" ? (
          <DailyMaintenance
            user_id={this.state.user_id}
            serverURL={serverURL}
          />
        ) : this.state.route === "hist" ? (
          <History />
        ) : this.state.route === "coping" ? (
          <CopingSkills />
        ) : (
          <section className="pa2-ns bt black-90 bg-light-gray">
            <h1 className="pa1 ma0">TITLE!</h1>
            <p>Temporary text</p>
          </section>
        )}
        <button onClick={this.onToggleModal}>Signin</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
