import React from "react";

import "./DisplayListItems.scss";

const DisplayListItems = ({ items, label, idAndName, key_id }) => {
  return (
    <div className="listitems-container">
      <label className="listitems-label" htmlFor={idAndName}>
        {label}
      </label>
      <div
        className="listitems-items-container"
        id={idAndName}
        name={idAndName}
      >
        {items &&
          items.length &&
          items.map((item, index) => {
            return (
              <p className="listitems-item" key={"uts_" + key_id + index}>
                {item}
              </p>
            );
          })}
      </div>
    </div>
  );
};
export default DisplayListItems;
