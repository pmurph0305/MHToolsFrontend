import React from "react";

import "./DisplayMultipleItems.scss";

const DisplayMultipleItems = ({ items }) => {
  return (
    <div className="display-multiple-container">
      {items &&
        items.length &&
        items.map(item => {
          return (
            <div key={item} className="display-multiple-item-container">
              <label className="display-multiple-item-label">
                {item.label}
              </label>
              <p className="display-multiple-item-text">{item.value}</p>
            </div>
          );
        })}
    </div>
  );
};

export default DisplayMultipleItems;
