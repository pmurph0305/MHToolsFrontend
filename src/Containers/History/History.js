import React from "react";
import { CartesianGrid, Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { connect } from "react-redux";
import { requestDMHistory, requestPHQ9History } from "./Redux/history_actions";

import "./History.scss";
import SelectionBox from "../../Components/SelectionBox/SelectionBox";
import ErrorBox from "../../Components/ErrorBox/ErrorBox"
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
        onRequestPHQ9History: user_id => dispatch(requestPHQ9History(user_id))
    };
};

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedHistory: "dm"
        };
    }

    componentDidMount() {
        this.props.onRequestDMHistory(this.props.user_id);
        this.props.onRequestPHQ9History(this.props.user_id);
    }

    dmDataProcess() {
        if (this.props.dm.length) {
            let data = this.props.dm.map((item, index) => {
                return {
                    x: item.date.slice(0, 10),
                    y: Math.floor((item.completed / item.total) * 1000) / 10
                };
            });
            console.log("DM data", data);
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
            console.log("PHQ9 data", data);
            return data;
        }
    }

    onSelectHistoryDisplayed = event => {
        console.log(event.target.value);
        switch (event.target.value) {
            case "0":
                return this.setState({ displayedHistory: "dm" });
            case "1":
                return this.setState({ displayedHistory: "phq9" });
            default:
                break;
        }
    };

    render() {
        const { error, isPending } = this.props;
        return (
            <div>
                <div className='historySelectContainer'>
                    <p className='historySelectContainerText'>Display History For:</p>
                    <SelectionBox
                        options={["Daily Maintenance", "PHQ9"]}
                        id={"historySelectionBox"}
                        label={"Select history graph to be displayed"}
                        onChange={this.onSelectHistoryDisplayed}
                    />
                </div>
                <div className='historyChartContainer'>
                    {isPending ? (
                        <p>Loading Data...</p>
                    )
                    : error ? (
                        <ErrorBox error="Error getting history data, please try again"/>
                    )
                    : this.state.displayedHistory === "dm" ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.dmDataProcess()}
                                margin={{bottom: 20}}
                            >
                                <CartesianGrid/>
                                <Line name="Tasks Completed" type="monotone" dataKey="y" stroke="#8884d8" />
                                <XAxis dataKey="x" label={{ value: "Date", position: "insideBottom", offset: -10}}/>
                                <YAxis unit="%" label={{ value: "Tasks Completed",angle: -90, offset: 10, position: "insideLeft" }} />
                                <Tooltip formatter={(value, name, props) => value+'%' }/>
                               
                            </LineChart>
                        </ResponsiveContainer>
                    ) : this.state.displayedHistory === "phq9" ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.phq9DataProcess()}
                                margin={{bottom: 20}}
                            >
                                <CartesianGrid/>
                                <Line name="PHQ9 Score" type="monotone" dataKey="y" stroke="#8884d8" />
                                <XAxis dataKey="x" abel={{ value: "Date", position: "insideBottom", offset: -10}}/>
                                <YAxis label={{ value: "PHQ9 Score", angle: -90, offset:20, position: "insideLeft" }} />
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
