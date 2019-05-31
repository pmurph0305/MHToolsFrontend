import React from "react";
import CBTEventDisplay from "./CBTEventDisplay";

const CBTEventList = ({ cbtEvents }) => {
  return (
    <>
      {cbtEvents && cbtEvents.length > 0
        ? cbtEvents.map((event, index) => {
            return (
              <CBTEventDisplay
                key={"cbt_event_" + index}
                cbt_event={event}
                id={"cbt_event_" + index}
              />
            );
          })
        : null}
    </>
  );
};

export default CBTEventList;
