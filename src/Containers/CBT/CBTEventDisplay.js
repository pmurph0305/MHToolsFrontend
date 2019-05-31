import React from "react";

import DisplayListItems from "../../Components/DisplayListItems/DisplayListItems";
import DisplayTextBox from "../../Components/DisplayTextBox/DisplayTextBox";
import ClickableIcon from "../../Components/ClickableIcon/ClickableIcon";

import "./CBTEventDisplay.scss";

const UNHELPFUL_THINKING_STYLES = [
  "Probability Overestimation",
  "Mind Reading",
  "Personalization",
  '"Should" Statements',
  "Catastrophic Thinking",
  "All-or-Nothing Thinking",
  "Selective Attention and Memory"
];

class CBTEventDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      justExpanded: false
    };

    this.expandRef = React.createRef();
  }

  onGetThinkingStyles = () => {
    return this.props.cbt_event.thinking_styles
      .filter(item => item)
      .map((item, index) => {
        return UNHELPFUL_THINKING_STYLES[index];
      });
  };

  onGetBelifeRatings = () => {
    return [
      {
        label: "Belief in Automatic Thoughts Before:",
        value: this.props.cbt_event.rating_before
      },
      { label: "After:", value: this.props.cbt_event.rating_after }
    ];
  };

  onCollapsibleClick(cbt_id) {
    console.log("click");
    let container = document.getElementById("cbt-event-display_" + cbt_id);
    console.log(container.style.maxHeight);
    if (container.style.maxHeight !== "0px" && container.style.maxHeight) {
      console.log("collapse");
      // hide container div border & display.
      container.style.borderBottom = "0px";
      container.style.display = "none";
      container.style.maxHeight = "0px";
    } else {
      console.log("expanding");
      // collapsible is expanding, so add a border to the container div
      container.style.borderBottom = "1px solid black";
      container.style.display = "block";
      // Set max height to add transition to expanding card.
      container.style.maxHeight = container.scrollHeight + "px";
    }
  }

  componentDidUpdate() {
    if (this.state.justExpanded) {
      console.log(this.expandRef.current);
      this.setState({ justExpanded: false });
      this.expandRef.current.focus();
    }
  }

  onExpand = () => {
    this.setState({ expanded: !this.state.expanded, justExpanded: true });
  };

  render() {
    const { cbt_event } = this.props;
    return (
      <div
        className="cbt-event-display"
        id={"cbt-event-display_" + cbt_event.cbt_id}
      >
        {!this.state.expanded ? (
          <>
            <button
              style={{ float: "left" }}
              onClick={() => this.onExpand()}
              ref={this.expandRef}
            >
              <ion-icon name={"arrow-dropright"} />
            </button>
            <DisplayTextBox
              text={cbt_event.situation}
              label={"Situation"}
              idAndName={cbt_event.cbt_id + "_sit"}
            />
          </>
        ) : (
          <div className="cbt-event-display-situation">
            <button
              style={{ float: "left" }}
              onClick={() => this.onExpand()}
              ref={this.expandRef}
            >
              <ion-icon name={"arrow-dropleft"} />
            </button>
            <DisplayTextBox
              text={cbt_event.situation}
              label={"Situation"}
              idAndName={cbt_event.cbt_id + "_sit"}
            />

            <DisplayTextBox
              text={cbt_event.date.slice(0, 10)}
              label={"Date"}
              idAndName={cbt_event.cbt_id + "_dat"}
            />
            <DisplayTextBox
              text={`Before: ${cbt_event.rating_before} After: ${
                cbt_event.rating_after
              }`}
              label="Anxiety/Belief Ratings"
              idAndName={cbt_event.cbt_id + "_bel"}
            />
            {cbt_event.automatic_thoughts && (
              <DisplayTextBox
                text={cbt_event.automatic_thoughts}
                label={"Automatic Thoughts"}
                idAndName={cbt_event.cbt_id + "_aut"}
              />
            )}

            {cbt_event.alternative_thoughts && (
              <DisplayTextBox
                text={cbt_event.alternative_thoughts}
                label={"Alternative Thoughts"}
                idAndName={cbt_event.cbt_id + "_alt"}
              />
            )}
            {cbt_event.evidence_conclusions && (
              <DisplayTextBox
                text={cbt_event.evidence_conclusions}
                label={"Evidence and Realistic Conclusions"}
                idAndName={cbt_event.cbt_id + "_evi"}
              />
            )}
            {this.onGetThinkingStyles().length > 0 && (
              <DisplayListItems
                items={this.onGetThinkingStyles()}
                label="Unhelpful Thinking Styles"
                idAndName={cbt_event.cbt_id + "_uts"}
                key_id={cbt_event.cbt_id}
              />
            )}
          </div>
        )}

        {/* {cbt_event.rating_before && cbt_event.rating_after && (
          <DisplayTextBox
            text={"Before: "+cbt_event.rating_before + " After: " + cbt_event.rating_after}
            label={"Belief Rating"}
            idAndName={cbt_event.cbt_id + "_rat"}
          />
        )} */}
      </div>
    );
  }
}

export default CBTEventDisplay;
