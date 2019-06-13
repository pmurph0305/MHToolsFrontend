import {
  REQUEST_DM_HISTORY_SUCCESS,
  REQUEST_PHQ9_HISTORY_SUCCESS,
  REQUEST_CBT_BELIEF_HISTORY_SUCCESS,
  REQUEST_CBT_THOUGHT_HISTORY_SUCCESS,
  REQUEST_DM_HISTORY_PENDING,
  REQUEST_PHQ9_HISTORY_PENDING,
  REQUEST_CBT_BELIEF_HISTORY_PENDING,
  REQUEST_CBT_THOUGHT_HISTORY_PENDING,
  REQUEST_DM_HISTORY_FAILED,
  REQUEST_PHQ9_HISTORY_FAILED,
  REQUEST_CBT_BELIEF_HISTORY_FAILED,
  REQUEST_CBT_THOUGHT_HISTORY_FAILED
} from "./history_constants";
import { SERVER_URL } from "../../../Constants/constants";
import { fetchURLWithJsonAuth } from "../../../ReduxHelpers/reduxHelpers";
const HISTORY_URL = SERVER_URL + "history";

export const requestDMHistory = id => dispatch => {
  dispatch({ type: REQUEST_DM_HISTORY_PENDING });
  fetchURLWithJsonAuth(`${HISTORY_URL}/dm/${id}`)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_DM_HISTORY_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: REQUEST_DM_HISTORY_FAILED, payload: err }));
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

export const requestCBTThoughtHistory = id => dispatch => {
  dispatch({ type: REQUEST_CBT_THOUGHT_HISTORY_PENDING });
  fetchURLWithJsonAuth(`${HISTORY_URL}/cbt/thinkingstyles/${id}`)
    .then(response => response.json())
    .then(data =>
      dispatch({ type: REQUEST_CBT_THOUGHT_HISTORY_SUCCESS, payload: data })
    )
    .catch(err =>
      dispatch({ type: REQUEST_CBT_THOUGHT_HISTORY_FAILED, payload: err })
    );
};

export const requestCBTBeliefHistory = id => dispatch => {
  dispatch({ type: REQUEST_CBT_BELIEF_HISTORY_PENDING });
  fetchURLWithJsonAuth(`${HISTORY_URL}/cbt/ratings/${id}`)
    .then(response => response.json())
    .then(data =>
      dispatch({ type: REQUEST_CBT_BELIEF_HISTORY_SUCCESS, payload: data })
    )
    .catch(err =>
      dispatch({ type: REQUEST_CBT_BELIEF_HISTORY_FAILED, payload: err })
    );
};
