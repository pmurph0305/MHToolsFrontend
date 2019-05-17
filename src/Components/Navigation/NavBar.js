import logo from "./mh_logo_white.png";
import NavButtonLi from "../NavButton/NavButtonLi";
import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.scss";
const NavBar = props => {
  return (
    <header className="navHeader">
      <nav className="navClass" role="navigation">
        <ul>
          <li>
            <Link to="/">
              <img className="" alt="home" src={logo} />
            </Link>
          </li>
          <NavButtonLi buttonLabel="Daily Maintenance" route="dm" />
          <NavButtonLi buttonLabel="PHQ-9" route="phq9" />
          <NavButtonLi buttonLabel="CBT" route="cbt" />
          <NavButtonLi buttonLabel="Coping Skills" route="coping" />
          <NavButtonLi buttonLabel="History" route="hist" />
          {!props.isSignedIn ? (
            <>
              <li className="sign-ins">
                <button onClick={() => props.onModalChange("register")}>
                  Register
                </button>
              </li>
              <li className="sign-ins">
                <button onClick={() => props.onModalChange("signin")}>
                  Sign in
                </button>
              </li>
            </>
          ) : (
            <li className="sign-ins">
              <button onClick={() => props.onModalChange("signout")}>
                Sign out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
