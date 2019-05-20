import React from "react";

import "./SectionInfo.scss";

/**
 * @param  {string} {title} Title to be displayed
 * @param  {string} {description} Description to be displayed
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

export default SectionInfo;
