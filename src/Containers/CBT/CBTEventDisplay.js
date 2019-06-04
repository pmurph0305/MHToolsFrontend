import React from "react";

import DisplayLabeledText from "../../Components/DisplayLabeledText/DisplayLabeledText";

import debounce from "../../HelperScripts/debounce";
import "./CBTEventDisplay.scss";

class CBTEventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.divRef = React.createRef();
    this.resizeDebounce = debounce(this.onResizeChange, 150);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeDebounce);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeDebounce);
  }

  onResizeChange = () => {
    if (this.state.expanded) {
      this.divRef.current.style.maxHeight =
        this.divRef.current.scrollHeight + "px";
    }
  };

  onClickSituation = event => {
    // Collapsible is closing.
    if (
      this.divRef.current.style.maxHeight !== "0px" &&
      this.divRef.current.style.maxHeight
    ) {
      this.setState({ expanded: false });
      // hide container div border & display.
      this.divRef.current.style.borderBottom = "0px";
      this.divRef.current.style.maxHeight = "0px";
    } else {
      this.setState({ expanded: true });
      // collapsible is expanding, so add a border to the container div
      this.divRef.current.style.borderBottom = "1px solid black";
      this.divRef.current.style.display = "block";
      // Set max height to add transition to expanding card.
      this.divRef.current.style.maxHeight =
        this.divRef.current.scrollHeight + "px";
      // (parseInt(this.divRef.current.scrollHeight) + 8) + "px";
    }
  };

  render() {
    const { cbt_event } = this.props;
    return (
      <>
        <div
          className="cbt-event-collapse-container"
          id="cbt-event-display-button"
          value={cbt_event.situation}
          onClick={this.onClickSituation}
        >
          <p className="cbt-event-display-label">
            {cbt_event.situation.length > 40
              ? cbt_event.situation.slice(0, 40)
              : cbt_event.situation}
          </p>
          <p className="cbt-event-display-date">
            {cbt_event.date.slice(0, 10)}
          </p>
        </div>
        <div className="cbt-event-display-container" ref={this.divRef}>
          <DisplayLabeledText label="Situation" text={cbt_event.situation} />
          <DisplayLabeledText
            label="Automatic Thoughts"
            text={cbt_event.automatic_thoughts}
          />
          <DisplayLabeledText
            label="Alternative Thoughts"
            text={cbt_event.alternative_thoughts}
          />
          <DisplayLabeledText
            label="Evidence and Realistic Conclusions"
            text={cbt_event.evidence_conclusions}
          />
        </div>
      </>
    );
  }
}

export default CBTEventDisplay;
