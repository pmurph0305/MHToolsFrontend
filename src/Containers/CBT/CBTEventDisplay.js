import React from "react";

import DisplayListItems from "../../Components/DisplayListItems/DisplayListItems";
import DisplayTextBox from "../../Components/DisplayTextBox/DisplayTextBox";

const CBTEventDisplay = ({ event }) => {
  return (
    <div key={"cbt_event_" + event.cbt_id}>
      <DisplayTextBox
        text={event.date.slice(0, 10)}
        label={"Date"}
        idAndName={event.cbt_id + "_dat"}
      />

      <DisplayTextBox
        text={event.situation}
        label={"Situation"}
        idAndName={event.cbt_id + "_sit"}
      />

      {event.automatic_thoughts && (
        <DisplayTextBox
          text={event.automatic_thoughts}
          label={"Automatic Thoughts"}
          idAndName={event.cbt_id + "_aut"}
        />
      )}

      {event.alternative_thoughts && (
        <DisplayTextBox
          text={event.alternative_thoughts}
          label={"Alternative Thoughts"}
          idAndName={event.cbt_id + "_alt"}
        />
      )}
      {event.evidence_conclusions && (
        <DisplayTextBox
          text={event.evidence_conclusions}
          label={"Evidence and Realistic Conclusions"}
          idAndName={event.cbt_id + "_evi"}
        />
      )}
      {event.thinking_styles && (
        <DisplayListItems
          items={event.thinking_styles}
          label="Unhelpful Thinking Styles"
          idAndName={event.cbt_id + "_uts"}
        />
      )}
      {event.thinking_styles}
      {event.rating_before}
      {event.rating_after}
    </div>
  );
};

export default CBTEventDisplay;
