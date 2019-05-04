import React from "react";
import { CartesianGrid, Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { connect } from "react-redux";
import { requestDMHistory, requestPHQ9History } from "./Redux/history_actions";


const mapStateToProps = (state) => {
	return {
		user_id: state.appReducer.user_id,
		phq9: state.historyReducer.phq9,
        dm: state.historyReducer.dm,
        isPending: state.historyReducer.isPending,
        error: state.historyReducer.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
        onRequestDMHistory: (user_id) => dispatch(requestDMHistory(user_id)),
        onRequestPHQ9History: (user_id) => dispatch(requestPHQ9History(user_id))
    };
};

class History extends React.Component {

    componentDidMount() {
        this.props.onRequestDMHistory(this.props.user_id);
        this.props.onRequestPHQ9History(this.props.user_id);
    }

    dmDataProcess() {
        if (this.props.dm.length) {
            let data = this.props.dm.map( (item, index) => {
                return ({
                    "date" : item.date.slice(0,10),
                    "dmCompletePercent": Math.floor((item.completed/item.total)*1000)/10
                })
            })
            console.log(data);
            return data;
        }

    }

	render() {
        const { dm , phq9, error, isPending } = this.props;
        return(
            <div>
                DM
                { dm.length
                ? dm.map(item => {
                    return(<p key={item.date}>{item.date.slice(0,10) + "|" + item.total + "|" + item.completed}</p>)
                })
                : null
                }
                PHQ9
                { phq9.length
                ? phq9.map(item => {
                    return(<p key={item.date}>{item.date + "|" + item.score}</p>)
                })
                : null
                }
                {
                    isPending ? 'LOADING' : null
                }
                {
                    error ? error.toString() : null
                }
                {dm.length ?
                <ResponsiveContainer width={700} height={400}>
                    <LineChart data={this.dmDataProcess()}>
                        <CartesianGrid strokeDasharray="1 1" />
                        <Line name='% Tasks Completed' type='monotone' dataKey='dmCompletePercent' stroke='#8884d8'/>
                        <XAxis dataKey="date"/>
                        <YAxis label={{ value: '% Tasks Completed', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
                : null

                }
            </div>
        );
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(History);
