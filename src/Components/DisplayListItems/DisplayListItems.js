import React from "react";

import "./DisplayListItems.scss";

const DisplayListItems = ({ items, label, idAndName }) => {
  return (
    <div className="listitems-container">
      <label className="listitems-label" htmlFor={idAndName}>
        {label}
      </label>
      <div className="listitems-items" id={idAndName} name={idAndName}>
        {items &&
          items.map(item => {
            return <div key={item}>{item}</div>;
          })}
      </div>
    </div>
  );
};
export default DisplayListItems;
