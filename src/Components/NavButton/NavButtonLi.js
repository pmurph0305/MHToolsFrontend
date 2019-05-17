import React from "react";
import { Link } from "react-router-dom";
/**
 * @param {string} buttonLabel text displayed on the button
 * @param {string} liClasss className for each button li element default: null
 * @param {string} route Route for react router
 */
const NavButtonLi = ({ buttonLabel, route, liClass }) => {
  return (
    <li className={liClass ? liClass : null}>
      <Link to={`/${route}`}>
        <button>{buttonLabel}</button>
      </Link>
    </li>
  );
};

export default NavButtonLi;
