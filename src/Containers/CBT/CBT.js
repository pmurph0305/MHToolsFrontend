import React from "react";

import CBTEventForm from "./CBTEventForm";
import InputField from "../../Components/InputField/InputField";
import SectionInfo from "../../Components/SectionInfo/SectionInfo";

import "./CBT.scss";

class CBT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingEvent: false,
      cbtSituation: ""
    };
  }

  onCreateNewEvent = textInput => {
    console.log(textInput.value);
    this.setState({ creatingEvent: true, cbtSituation: textInput.value });
  };

  onSubmitNewEvent = event => {
    console.log("submit!");
    event.preventDefault();
    let eventDescription = event.target.elements[0].value;
    console.log(eventDescription);
    console.log(event.target.elements);
    let situation = event.target.elements.namedItem("cbtSituation").value;
    let automaticThoughts = event.target.elements.namedItem(
      "cbtAutomaticThoughts"
    ).value;
    let beforeBelief = event.target.elements.namedItem("cbtBeforeRange").value;
    let afterBelief = event.target.elements.namedItem("cbtAfterRange").value;
    console.log("s", situation);
    console.log("at", automaticThoughts);
    console.log("rb", beforeBelief);
    console.log("ra", afterBelief);
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
        {this.state.creatingEvent && (
          <CBTEventForm
            onSubmit={this.onSubmitNewEvent}
            cbtSituation={this.state.cbtSituation}
          />
        )}
        Date & time (not shown) - Situation - describe the situation or trigger
        for your thoughts - Automatic Negative thougths and predictions - Belief
        rating - Identify Cognitive Distortions - Alternative thoughts &
        predictions - Evidence & realistic conclusions - Belief After
        <InputField
          onClick={this.onCreateNewEvent}
          placeholder="Enter a new situation"
          buttonTitle="Create new CBT record"
        />
      </section>
    );
  }
}

export default CBT;
