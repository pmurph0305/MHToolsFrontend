import {
	REQUEST_DM_HISTORY_SUCCESS,
	REQUEST_PHQ9_HISTORY_SUCCESS,
	REQUEST_DM_HISTORY_PENDING,
	REQUEST_PHQ9_HISTORY_PENDING,
	REQUEST_DM_HISTORY_FAILED,
	REQUEST_PHQ9_HISTORY_FAILED
} from "./history_constants";



import {fetchURLWithJsonAuth} from '../../../ReduxHelpers/reduxHelpers'
const HISTORY_URL = 'http://localhost:3001/history'

export const requestDMHistory = id => dispatch => {
    dispatch({ type: REQUEST_DM_HISTORY_PENDING });
    fetchURLWithJsonAuth(`${HISTORY_URL}/dm/${id}`)
		.then(response => response.json())
		.then(data =>
			dispatch({ type: REQUEST_DM_HISTORY_SUCCESS, payload: data })
		)
		.catch(err =>
			dispatch({ type: REQUEST_DM_HISTORY_FAILED, payload: err })
		);
};

export const requestPHQ9History = id => dispatch => {
	dispatch({ type: REQUEST_PHQ9_HISTORY_PENDING });
	fetchURLWithJsonAuth(`${HISTORY_URL}/phq9/${id}`)
		.then(response => response.json())
		.then(data =>
			dispatch({ type: REQUEST_PHQ9_HISTORY_SUCCESS, payload: data })
		)
		.catch(err =>
			dispatch({ type: REQUEST_PHQ9_HISTORY_FAILED, payload: err })
		);
};
