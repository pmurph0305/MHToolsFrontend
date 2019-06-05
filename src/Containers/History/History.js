import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
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

import SectionInfo from "../../Components/SectionInfo/SectionInfo";
import SelectionBox from "../../Components/SelectionBox/SelectionBox";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";

import "./History.scss";

const mapStateToProps = state => {
  return {
    user_id: state.appReducer.user_id,
    phq9: state.historyReducer.phq9,
    dm: state.historyReducer.dm,
    cbtts: state.historyReducer.cbtts,
    cbtbr: state.historyReducer.cbtbr,
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

const thinkingStyles = [
  "Probability Overestimation",
  "Mind Reading",
  "Personalization",
  '"Should" Statements',
  "Catastrophic Thinking",
  "All-or-Nothing Thinking",
  "Selective Attention and Memory"
];

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

  cbttsDataProcess() {
    if (this.props.cbtts.length) {
      return this.props.cbtts.map((item, index) => {
        return {
          "Thinking Style": thinkingStyles[index],
          total: item
        };
      });
    } else {
      return thinkingStyles.map(item => {
        return {
          "Thinking Style": item,
          total: 0
        };
      });
    }
  }

  cbtbrDataProcess() {
    if (this.props.cbtbr.length) {
      let data = this.props.cbtbr.map((item, index) => {
        return {
          date: item.date.slice(0, 10),
          Before: item.rating_before,
          After: item.rating_after
        };
      });
      console.log(data);
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
      <section className="HistorySection">
        <SectionInfo
          title="History"
          description="A tool to use to track progress when using other tools available on this website."
        />
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
              <LineChart
                data={this.dmDataProcess()}
                margin={{ right: 10, left: 10 }}
              >
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
                    position: "insideBottomRight",
                    offset: -10
                  }}
                />
                <YAxis
                  unit="%"
                  label={{
                    value: "Tasks Completed",
                    angle: -90,
                    position: "insideLeft"
                  }}
                />
                <Tooltip formatter={(value, name, props) => value + "%"} />
                <Legend formatter={(value, entry, index) => "% " + value} />
              </LineChart>
            </ResponsiveContainer>
          ) : this.state.displayedHistory === "phq9" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={this.phq9DataProcess()}
                margin={{ right: 10, left: 10 }}
              >
                <CartesianGrid />
                <Line
                  name="PHQ9 Score"
                  type="monotone"
                  dataKey="y"
                  stroke="#8884d8"
                />
                <XAxis
                  dataKey="x"
                  label={{
                    value: "Date",
                    position: "insideBottomRight",
                    offset: -10
                  }}
                />
                <YAxis
                  label={{
                    value: "PHQ9 Score",
                    angle: -90,
                    position: "insideLeft"
                  }}
                />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          ) : this.state.displayedHistory === "cbtts" ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={this.cbttsDataProcess()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="Thinking Style" />
                <PolarRadiusAxis angle={12.857} />
                <Radar
                  name="Total Unhelpful Thinking Styles"
                  dataKey="total"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Tooltip
                  formatter={(value, name, props) => [
                    value,
                    "# of times identified"
                  ]}
                />
                <Legend
                  formatter={(value, entry, index) =>
                    "Unhelpful Thinking Styles"
                  }
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : this.state.displayedHistory === "cbtbr" ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={this.cbtbrDataProcess()}
                margin={{ right: 10, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  label={{
                    value: "Date",
                    position: "insideBottomRight",
                    offset: -10
                  }}
                />
                <YAxis
                  unit="%"
                  label={{
                    value: "Belief in Automatic Thoughts",
                    angle: -90,
                    position: "insideLeft"
                  }}
                />
                <Tooltip
                  formatter={(value, name, props) => value + "%"}
                  itemSorter={() => 1}
                />
                <Legend verticalAlign="bottom" />
                <Bar dataKey="Before" fill="#ca8282" />
                <Bar dataKey="After" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </div>
      </section>
    );
  }
}

// dataKey="x"
//                   label={{
//                     value: "Date",
//                     position: "insideBottom",
//                     offset: -10
//                   }}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
