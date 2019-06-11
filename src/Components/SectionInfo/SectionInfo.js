import React from "react";
import PropTypes from "prop-types";

import "./SectionInfo.scss";

/**
 * SectionInfo - Returns a component that displays the title with a description underneath.
 * @param  {string} title Title to be displayed
 * @param  {string} description Description to be displayed
 * @param {string} descTextIndent indent value for textIndent css style for the description element.
 */
const SectionInfo = ({ title, description, descTextIndent }) => {
  return (
    <>
      <h1 className="section-title">{title}</h1>
      {description && (
        <div className="section-description-container">
          <p
            className="section-description"
            style={{ textIndent: descTextIndent }}
          >
            {description}
          </p>
        </div>
      )}
    </>
  );
};

SectionInfo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  descTextIndent: PropTypes.string
};

export default SectionInfo;
