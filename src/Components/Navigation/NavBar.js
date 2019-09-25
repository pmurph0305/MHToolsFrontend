import logo from "./mh_logo_white.png";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "./NavBar.scss";
/**
 * NavBar - returns a nav bar that is displayed at the top of the screen, doing routing using Links and react-router-dom.
 * @callback onModalChange called passing a string of the modal to open.
 */
const NavBar = props => {
  const menuEl = useRef(null);

  let onClickMenuIcon = () => {
    if (menuEl.current) {
      if (menuEl.current.getAttribute("class") === "nav__menu") {
        menuEl.current.setAttribute("class", "nav__menu open-menu");
      } else {
        menuEl.current.setAttribute("class", "nav__menu");
      }
    }
  };

  let onNavClick = () => {
    if (menuEl.current) {
      if (menuEl.current.getAttribute("class") === "nav__menu open-menu") {
        menuEl.current.setAttribute("class", "nav__menu");
      }
    }
  };

  let onUserModalsClick = entry => {
    onNavClick();
    props.onModalChange(entry);
  };

  return (
    <header className="nav__header">
      <nav className="nav__main" role="navigation">
        <ul ref={menuEl} className="nav__menu">
          <li onClick={onNavClick} className="nav__item nav__item--image">
            <Link className="nav__link nav__link--image" to="/">
              <img className="nav__image" alt="home" src={logo} />
            </Link>
          </li>
          <li onClick={onNavClick} className="nav__item">
            <Link className="nav__link" to="/dm">
              Daily Maintenance
            </Link>
          </li>
          <li onClick={onNavClick} className="nav__item">
            <Link className="nav__link" to="/phq9">
              PHQ-9
            </Link>
          </li>
          <li onClick={onNavClick} className="nav__item">
            <Link className="nav__link" to="/cbt">
              CBT
            </Link>
          </li>
          <li onClick={onNavClick} className="nav__item">
            <Link className="nav__link" to="/coping">
              Coping Skills
            </Link>
          </li>
          <li onClick={onNavClick} className="nav__item">
            <Link className="nav__link" to="/hist">
              History
            </Link>
          </li>
          {!props.isSignedIn ? (
            <>
              <li className="nav__item nav__item--right">
                <button
                  className="nav__button"
                  onClick={() => onUserModalsClick("register")}
                >
                  Register
                </button>
              </li>
              <li className="nav__item">
                <button
                  id="signin"
                  className="nav__button"
                  onClick={() => onUserModalsClick("signin")}
                >
                  Sign in
                </button>
              </li>
            </>
          ) : (
            <li className="nav__item nav__item--right">
              <button
                className="nav__button"
                onClick={() => onUserModalsClick("signout")}
              >
                Sign out
              </button>
            </li>
          )}
          <li className="nav__item nav__item--icon">
            <button
              className="nav__button nav__button--icon"
              onClick={onClickMenuIcon}
            >
              <ion-icon class="nav__icon" name="menu" size="large" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  onModalChange: PropTypes.func.isRequired
};

export default NavBar;
