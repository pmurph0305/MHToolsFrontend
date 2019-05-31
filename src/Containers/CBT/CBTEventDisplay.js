import React from "react";

import "./CBTEventDisplay.scss";

class CBTEventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  onClickSituation = event => {
    console.log(event.target);
    console.log("click", this.props.cbt_event.situation);
    console.log(this.divRef.current);
    console.log("collapsibleClick");
    // Collapsible is closing.
    if (
      this.divRef.current.style.maxHeight !== "0px" &&
      this.divRef.current.style.maxHeight
    ) {
      // hide container div border & display.
      this.divRef.current.style.borderBottom = "0px";
      this.divRef.current.style.maxHeight = "0px";
    } else {
      // collapsible is expanding, so add a border to the container div
      this.divRef.current.style.borderBottom = "1px solid black";
      this.divRef.current.style.display = "block";
      // Set max height to add transition to expanding card.
      this.divRef.current.style.maxHeight =
        parseInt(this.divRef.current.scrollHeight) + 8 + "px";
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
          <p className="cbt-event-display-label">{cbt_event.situation}</p>
          <p className="cbt-event-display-date">
            {cbt_event.date.slice(0, 10)}
          </p>
        </div>
        <div className="cbt-event-display-container" ref={this.divRef}>
          <div className="cbt-event-item-container">
            <label className="cbt-event-display-label">
              Alternative Thoughts
            </label>
            <p className="cbt-event-display-text">
              {cbt_event.alternative_thoughts}
            </p>
          </div>

          {cbt_event.thinking_styles}
          {cbt_event.date}
          {cbt_event.automatic_thoughts}
        </div>
      </>
    );
  }
}

export default CBTEventDisplay;
