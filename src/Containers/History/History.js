import React from "react";
import {
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { connect } from "react-redux";
import {
  requestDMHistory,
  requestPHQ9History,
  requestCBTThoughtHistory,
  requestCBTBeliefHistory
} from "./Redux/history_actions";

import "./History.scss";
import SelectionBox from "../../Components/SelectionBox/SelectionBox";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";

const mapStateToProps = state => {
  return {
    user_id: state.appReducer.user_id,
    phq9: state.historyReducer.phq9,
    dm: state.historyReducer.dm,
    isPending: state.historyReducer.isPending,
    error: state.historyReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDMHistory: user_id => dispatch(requestDMHistory(user_id)),
    onRequestPHQ9History: user_id => dispatch(requestPHQ9History(user_id)),
    onRequestCBTBeliefHistory: user_id =>
      dispatch(requestCBTBeliefHistory(user_id)),
    onRequestCBTThoughtHistory: user_id =>
      dispatch(requestCBTThoughtHistory(user_id))
  };
};

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedHistory: ""
    };
  }

  componentDidMount() {
    // make sure we have a user_id before requesting history.
    if (this.props.user_id && this.state.displayedHistory === "") {
      if (this.state.displayedHistory === "") {
        this.onRequestHistory("dm");
      } else {
        // re-get current history on mount, as user can update
        // data between mounts.
        this.onRequestHistory(this.state.displayedHistory);
      }
    }
  }

  componentDidUpdate() {
    if (this.props.user_id) {
      // only update history on update if we don't have state yet.
      if (this.state.displayedHistory === "") {
        this.onRequestHistory("dm");
      }
    }
  }

  dmDataProcess() {
    if (this.props.dm.length) {
      let data = this.props.dm.map((item, index) => {
        return {
          x: item.date.slice(0, 10),
          y: Math.floor((item.completed / item.total) * 1000) / 10
        };
      });
      return data;
    }
  }

  phq9DataProcess() {
    if (this.props.phq9.length) {
      let data = this.props.phq9.map((item, index) => {
        return {
          x: item.date.slice(0, 10),
          y: item.score
        };
      });
      return data;
    }
  }

  onRequestHistory = historyType => {
    switch (historyType) {
      case "dm":
        this.props.onRequestDMHistory(this.props.user_id);
        return this.setState({ displayedHistory: "dm" });
      case "phq9":
        this.props.onRequestPHQ9History(this.props.user_id);
        return this.setState({ displayedHistory: "phq9" });
      case "cbtbr":
        this.props.onRequestCBTBeliefHistory(this.props.user_id);
        return this.setState({ displayedHistory: "cbtbr" });
      case "cbtts":
        this.props.onRequestCBTThoughtHistory(this.props.user_id);
        return this.setState({ displayedHistory: "cbtts" });
      default:
        break;
    }
  };

  onSelectHistoryDisplayed = event => {
    switch (event.target.value) {
      case "0":
        return this.onRequestHistory("dm");
      case "1":
        return this.onRequestHistory("phq9");
      case "2":
        return this.onRequestHistory("cbtts");
      case "3":
        return this.onRequestHistory("cbtbr");
      default:
        break;
    }
  };

  render() {
    const { error, isPending } = this.props;
    return (
      <div>
        <div className="historySelectContainer">
          <p className="historySelectContainerText">Display History For:</p>
          <SelectionBox
            options={[
              "Daily Maintenance",
              "PHQ9",
              "CBT Thinking Styles",
              "CBT Automatic Thought Belief"
            ]}
            id={"historySelectionBox"}
            label={"Select history graph to be displayed"}
            onChange={this.onSelectHistoryDisplayed}
          />
        </div>
        <div className="historyChartContainer">
          {isPending ? (
            <p>Loading Data...</p>
          ) : error ? (
            <ErrorBox error={error} />
          ) : this.state.displayedHistory === "dm" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={this.dmDataProcess()} margin={{ bottom: 20 }}>
                <CartesianGrid />
                <Line
                  name="Tasks Completed"
                  type="monotone"
                  dataKey="y"
                  stroke="#8884d8"
                />
                <XAxis
                  dataKey="x"
                  label={{
                    value: "Date",
                    position: "insideBottom",
                    offset: -10
                  }}
                />
                <YAxis
                  unit="%"
                  label={{
                    value: "Tasks Completed",
                    angle: -90,
                    offset: 10,
                    position: "insideLeft"
                  }}
                />
                <Tooltip formatter={(value, name, props) => value + "%"} />
              </LineChart>
            </ResponsiveContainer>
          ) : this.state.displayedHistory === "phq9" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={this.phq9DataProcess()} margin={{ bottom: 20 }}>
                <CartesianGrid />
                <Line
                  name="PHQ9 Score"
                  type="monotone"
                  dataKey="y"
                  stroke="#8884d8"
                />
                <XAxis
                  dataKey="x"
                  abel={{
                    value: "Date",
                    position: "insideBottom",
                    offset: -10
                  }}
                />
                <YAxis
                  label={{
                    value: "PHQ9 Score",
                    angle: -90,
                    offset: 20,
                    position: "insideLeft"
                  }}
                />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
