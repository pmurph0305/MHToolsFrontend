import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
/**
 * NavButtonLi - returns a li element that contains a Link element to the route, which contains a button with the button label.
 * @param {string} buttonLabel text displayed on the button
 * @param {string} liClasss className for each button li element
 * @param {string} route Route for react router
 */
const NavButtonLi = ({ buttonLabel, route, liClass }) => {
  return (
    <li className={liClass}>
      <Link to={`/${route}`}>
        <button>{buttonLabel}</button>
      </Link>
    </li>
  );
};

NavButtonLi.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  liClass: PropTypes.string
};

export default NavButtonLi;
