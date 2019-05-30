import React from "react";

import DisplayListItems from "../../Components/DisplayListItems/DisplayListItems";
import DisplayTextBox from "../../Components/DisplayTextBox/DisplayTextBox";

const UNHELPFUL_THINKING_STYLES = [
  "Probability Overestimation",
  "Mind Reading",
  "Personalization",
  '"Should" Statements',
  "Catastrophic Thinking",
  "All-or-Nothing Thinking",
  "Selective Attention and Memory"
];

const CBTEventDisplay = ({ event }) => {
  let thinking_styles = event.thinking_styles
    .filter(item => item)
    .map((item, index) => {
      return UNHELPFUL_THINKING_STYLES[index];
    });

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
      {thinking_styles.length > 0 && (
        <DisplayListItems
          items={thinking_styles}
          label="Unhelpful Thinking Styles"
          idAndName={event.cbt_id + "_uts"}
          key_id={event.cbt_id}
        />
      )}
      {event.thinking_styles}
      {event.rating_before}
      {event.rating_after}
    </div>
  );
};

export default CBTEventDisplay;
