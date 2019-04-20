import React from "react";
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

	render() {
        const { dm , phq9, error, isPending } = this.props;
        return(
            <div>
                DM
                { dm.length
                ? dm.map(item => {
                    return(<p key={item.date}>{item.date + "|" + item.total + "|" + item.completed}</p>)
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
            </div>
        );
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(History);
