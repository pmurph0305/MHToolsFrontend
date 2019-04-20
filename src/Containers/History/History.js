import React from "react";
import { connect } from "react-redux";
import { requestDMHistory, requestPHQ9History } from "./Redux/history_actions";

const mapStateToProps = (state) => {
	return {
		user_id: state.appReducer.user_id,
		phq9: state.historyReducer.phq9,
		dm: state.historyReducer.phq9
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
    }

	render() {
		return <div>History</div> ;
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(History);
