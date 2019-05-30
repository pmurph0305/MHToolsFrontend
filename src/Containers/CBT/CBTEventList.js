import React from "react";
import CBTEVentDisplay from "./CBTEventDisplay";

const CBTEventList = ({ cbtEvents }) => {
  return (
    <>
      {cbtEvents && cbtEvents.length > 0
        ? cbtEvents.map(event => {
            return (
              <CBTEVentDisplay
                key={"cbt_event_" + event.cbt_id}
                event={event}
              />
            );
          })
        : null}
    </>
  );
};

export default CBTEventList;
