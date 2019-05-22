import {
  REQUEST_DM_HISTORY_SUCCESS,
  REQUEST_PHQ9_HISTORY_SUCCESS,
  REQUEST_DM_HISTORY_PENDING,
  REQUEST_PHQ9_HISTORY_PENDING,
  REQUEST_DM_HISTORY_FAILED,
  REQUEST_PHQ9_HISTORY_FAILED
} from "./history_constants";

import { LOG_OUT_USER } from "../../App/Redux/app_constants";

import { resetState, updateObject } from "../../../ReduxHelpers/reduxHelpers";

const initialState = {
  isPending: false,
  error: "",
  phq9: [],
  dm: []
};

export function historyReducer(state = initialState, action) {
  switch (action.type) {
    // fall through for all pending requests
    case REQUEST_DM_HISTORY_PENDING:
    case REQUEST_PHQ9_HISTORY_PENDING:
      return setRequestPending(state, action);
    // fall through for all failed requests
    case REQUEST_DM_HISTORY_FAILED:
    case REQUEST_PHQ9_HISTORY_FAILED:
      return setRequestFailedError(state, action);

    case REQUEST_DM_HISTORY_SUCCESS:
      return setDailyMaintenanceHistory(state, action);
    case REQUEST_PHQ9_HISTORY_SUCCESS:
      return setPHQ9History(state, action);

    case LOG_OUT_USER:
      return resetState(state, initialState);

    default:
      return state;
  }
}

function setRequestPending(state, action) {
  return updateObject(state, { isPending: true });
}

function setRequestFailedError(state, action) {
  return updateObject(state, { isPending: false, error: action.payload });
}

function setDailyMaintenanceHistory(state, action) {
  if (Array.isArray(action.payload)) {
    return updateObject(state, {
      dm: action.payload,
      isPending: false,
      error: ""
    });
  } else {
    return handleErrors(state, action);
  }
}

function handleErrors(state, action) {
  if (action.payload === "Unauthorized Request") {
    return updateObject(state, {
      isPending: false,
      error: "You are not logged in."
    });
  } else {
    return updateObject(state, {
      isPending: false,
      error: "Error getting history data."
    });
  }
}

function setPHQ9History(state, action) {
  if (Array.isArray(action.payload)) {
    return updateObject(state, {
      phq9: action.payload,
      isPending: false,
      error: ""
    });
  } else {
    return handleErrors(state, action);
  }
}
