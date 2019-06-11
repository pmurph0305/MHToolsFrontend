import React from "react";
import PropTypes from "prop-types";

import "./DMDateNav.scss";

/**
 * DMDateNav - Returns a component that displays the current take with clickable previous and next buttons.
 * @param  {string} date date displayed
 * @callback onClick called when button is clicked, buttons have values of -1 for previous, and 1 for next.
 */
const DMDateNav = ({ date, onClick }) => {
  return (
    <div className="dateContainer">
      <button value="-1" onClick={onClick} className="DateNavButton">
        Previous
      </button>
      <p className="DateDisplay">{date}</p>
      <button value="1" onClick={onClick} className="DateNavButton">
        Next
      </button>
    </div>
  );
};

DMDateNav.propTypes = {
  date: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default DMDateNav;
