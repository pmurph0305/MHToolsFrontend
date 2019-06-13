import React from "react";
import { connect } from "react-redux";

import AlertNotSignedIn from "../../Components/AlertNotSignedIn/AlertNotSignedIn";
import CBTEventForm from "./CBTEventForm";
import CBTEventList from "./CBTEventList";
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

  componentDidMount() {
    this.getPreviousEventsIfLoggedIn();
  }

  componentDidUpdate() {
    this.getPreviousEventsIfLoggedIn();
  }

  getPreviousEventsIfLoggedIn = () => {
    if (
      this.props.user_id &&
      (!Array.isArray(this.props.cbt_events) || !this.props.cbt_events.length)
    ) {
      this.props.onGetCBTEvents(this.props.user_id);
    }
  };

  onCreateNewEvent = textInput => {
    this.setState(
      { creatingEvent: true, cbtSituation: textInput.value },
      () => {
        textInput.value = "";
      }
    );
  };

  onSubmitCBTForm = data => {
    this.props.onSubmitCBTEvent(this.props.user_id, data);
    this.setState({ creatingEvent: false, cbtSituation: "" });
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
        {!this.props.user_id && (
          <AlertNotSignedIn ThingsTheyCantDo=" submit, view, or keep track of cbt events" />
        )}
        {this.state.creatingEvent && (
          <CBTEventForm
            onSubmit={this.onSubmitCBTForm}
            cbtSituation={this.state.cbtSituation}
          />
        )}
        <div className="cbt-event-input-container">
          <InputField
            onClick={this.onCreateNewEvent}
            placeholder="Enter a new situation"
            buttonTitle="Create new event"
          />
        </div>
        {this.props.cbt_events.length > 0 && (
          <div className="cbt-event-list-container">
            <CBTEventList cbtEvents={this.props.cbt_events} />
          </div>
        )}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CBT);
