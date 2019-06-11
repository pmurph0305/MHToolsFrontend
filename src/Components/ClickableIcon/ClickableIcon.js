import React from "react";
import PropTypes from "prop-types";

/**
 * @param  {string} iconName ionicon icon name
 * @param  {string} iconSize ionicon icon size (small or large)
 * @param  {function} onClick onClick event handler
 */
const ClickableIcon = ({ iconName, iconSize, onClick }) => {
  return <ion-icon name={iconName} onClick={onClick} size={iconSize} />;
};

ClickableIcon.defaultProps = {
  iconSize: "default"
};

ClickableIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ClickableIcon;
