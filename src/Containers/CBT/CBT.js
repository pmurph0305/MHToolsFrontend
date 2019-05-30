import React from "react";
import { connect } from "react-redux";

import CBTEventForm from "./CBTEventForm";
import InputField from "../../Components/InputField/InputField";
import SectionInfo from "../../Components/SectionInfo/SectionInfo";

import { onGetCBTEvents, onSubmitCBTEvent } from "./Redux/cbt_actions";
import "./CBT.scss";

const mapStateToProps = state => {
  return {
    user_id: state.appReducer.user_id,
    cbt_events: state.CBTReducer.cbt_events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitCBTEvent: (id, data) => dispatch(onSubmitCBTEvent(id, data)),
    onGetCBTEvents: id => dispatch(onGetCBTEvents(id))
  };
};

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

  onSubmitCBTForm = data => {
    console.log("cbt data", data);
    this.props.onSubmitCBTEvent(this.props.user_id, data);
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
            onSubmit={this.onSubmitCBTForm}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CBT);
