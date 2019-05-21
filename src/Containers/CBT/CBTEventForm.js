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
  render() {
    const { onSubmit, cbtSituation } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <InputText
          inputLabel="Situation"
          placeholder="Enter a short description of the situation"
          idAndName="cbtSituation"
          defaultValue={cbtSituation}
        />
        <InputTextArea
          idAndName={"cbtAutomaticThoughts"}
          inputLabel={"Automatic Thoughts"}
          inputDesc={
            "Write down some automatic thoughts and predictions you had about the situation."
          }
          placeholder={
            "I'm going to embarass myself. Everyone is going to laugh at me and think I'm stupid. I should have prepared more."
          }
        />
        <InputRange
          idAndName={"cbtBeforeRange"}
          inputLabel={
            "Rate your belief in your automatic thoughts and predictions when the situation happened."
          }
          minLabel={"Less"}
          maxLabel={"More"}
        />
        <InputCheckboxList
          inputLabel={"Cognitive Distortions"}
          inputDesc={
            "Identify unhelpful thinking styles that are present in your automatic thoughts"
          }
          checkboxList={checkboxList}
        />
        <InputCheckboxList
          inputLabel={"Cognitive Distortions"}
          inputDesc={
            "Identify unhelpful thinking styles that are present in your automatic thoughts"
          }
        />
        <InputTextArea
          idAndName={"cbtChallengeThoughts"}
          inputLabel={"Alternative Thoughts"}
          inputDesc={
            "Write down and challenge the automatic thoughts that you had with more realistic thoughts"
          }
          placeholder={
            "I don't have to be perfect in everything. More examples More examples...."
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
