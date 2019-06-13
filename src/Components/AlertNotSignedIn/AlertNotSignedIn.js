import React from "react";

import "./AlertNotSignedIn.scss";

const AlertNotSignedIn = ({ ThingsTheyCantDo }) => {
  return (
    <div className="not-signed-in-alert-container">
      <p className="not-signed-in-alert">
        You are not currently signed in. You won't be able to {ThingsTheyCantDo}
        .
      </p>
    </div>
  );
};

export default AlertNotSignedIn;
