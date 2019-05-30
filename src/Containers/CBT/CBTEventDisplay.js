import React from "react";

const CBTEventDisplay = ({ event }) => {
  return (
    <div key={"cbt_event_" + event.cbt_id}>
      {event.situation}
      {event.automatic_thoughts}
      {event.rating_before}
      {event.rating_after}
      {event.evidence_conclusions}
      {event.alternative_thoughts}
      {event.date}
      {event.thinking_styles}
    </div>
  );
};

export default CBTEventDisplay;
