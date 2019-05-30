import React from "react";
import CBTEVentDisplay from "./CBTEventDisplay";

const CBTEventList = ({ cbtEvents }) => {
  return (
    <>
      {cbtEvents && cbtEvents.length > 0
        ? cbtEvents.map((event, index) => {
            return <CBTEVentDisplay key={"cbt_event_" + index} event={event} />;
          })
        : null}
    </>
  );
};

export default CBTEventList;
