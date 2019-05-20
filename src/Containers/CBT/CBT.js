import React from "react";

import InputField from "../../Components/InputField/InputField";
import SectionInfo from "../../Components/SectionInfo/SectionInfo";

import "./CBT.scss";

class CBT extends React.Component {
  onCreateNewEvent = textInput => {
    console.log(textInput.value);
  };

  render() {
    return (
      <section className="CBTSection">
        <SectionInfo
          title={"CBT"}
          description={
            "A tool to use to train yourself to think more positively"
          }
        />
        Date & time (not shown) Situation - describe the situation or trigger
        for your thoughts Automatic Negative thougths and predictions Belief
        rating Identify Cognitive Distortions Alternative thoughts & predictions
        Evidence & realistic conclusions Belief After
        <InputField
          onClick={this.onCreateNewEvent}
          placeholder="Enter a new event description..."
          buttonTitle="Create new thought record"
        />
      </section>
    );
  }
}

export default CBT;
