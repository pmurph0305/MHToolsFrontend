import React from "react";

import InputCheckboxList from "../../Components/InputCheckboxList/InputCheckboxList";
import InputRange from "../../Components/InputRange/InputRange";
import InputText from "../../Components/InputText/InputText";
import InputTextArea from "../../Components/InputTextArea/InputTextArea";

const checkboxList = [
  "Probability Overestimation",
  "Mind Reading",
  "Personalization",
  '"Should" Statements',
  "Catastrophic Thinking",
  "All-or-Nothing Thinking",
  "Selective Attention and Memory"
];

class CBTEventForm extends React.Component {
  onSubmitForm = event => {
    console.log("submit!");
    event.preventDefault();
    let situation = event.target.elements.namedItem("cbtSituation").value;
    let automaticThoughts = event.target.elements.namedItem(
      "cbtAutomaticThoughts"
    ).value;
    let ratingBefore = event.target.elements.namedItem("cbtBeforeRange").value;
    let thinkingStyles = checkboxList.map(item => {
      return event.target.elements.namedItem(item).checked;
    });
    let alternativeThoughts = event.target.elements.namedItem(
      "cbtAlternativeThoughts"
    ).value;
    let evidenceConclusions = event.target.elements.namedItem(
      "cbtEvidenceConclusions"
    ).value;
    let ratingAfter = event.target.elements.namedItem("cbtAfterRange").value;

    this.props.onSubmit({
      date: new Date().toISOString().slice(0, 10),
      situation,
      automaticThoughts,
      ratingBefore,
      thinkingStyles,
      alternativeThoughts,
      evidenceConclusions,
      ratingAfter
    });
  };

  render() {
    const { cbtSituation } = this.props;

    return (
      <form onSubmit={event => this.onSubmitForm(event)}>
        <InputText
          inputLabel="Situation"
          placeholder="Gave a presentation. Went on a date. Meeting at work."
          idAndName="cbtSituation"
          defaultValue={cbtSituation}
        />
        <InputTextArea
          idAndName={"cbtAutomaticThoughts"}
          inputLabel={"Automatic Thoughts"}
          inputDesc={
            "Write down some anxious thoughts you had that occured during or when thinking about the situation."
          }
          placeholder={"I'm going to embarass myself."}
        />
        <InputRange
          idAndName={"cbtBeforeRange"}
          inputLabel={
            "Rate your belief in your automatic thoughts and predictions."
          }
          minLabel={"Less"}
          maxLabel={"More"}
        />
        <InputCheckboxList
          inputLabel={"Unhelpful Thinking Styles"}
          inputDesc={
            "Identify unhelpful thinking styles that are present in your automatic thoughts."
          }
          checkboxList={checkboxList}
        />
        <InputTextArea
          idAndName={"cbtAlternativeThoughts"}
          inputLabel={"Alternative Thoughts"}
          inputDesc={
            "Write down alternative thoughts and predictions that are more positive."
          }
          placeholder={
            "I'll give a good presentation. No one will be able to tell that I am anxious. People who notice my anxiety will understand, because most people are nervous for presentations."
          }
        />
        <InputTextArea
          idAndName={"cbtEvidenceConclusions"}
          inputLabel={"Evidence and Realistic Conclusions"}
          inputDesc={
            "Try to look at the evidence for your automatic thoughts, as well as your alternative thoughts. Write down a more realistic conclusion based on your evidence."
          }
          placeholder={
            "No one really notices my anxiety, in fact some people have commented that I appear confident. I've given presentations in the past, and people said I did a good job. I was asked to give a presentation again, so I must be good at it."
          }
        />

        <InputRange
          idAndName={"cbtAfterRange"}
          inputLabel={
            "Rate your belief in your automatic thoughts and predictions now."
          }
          minLabel={"Less"}
          maxLabel={"More"}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CBTEventForm;
