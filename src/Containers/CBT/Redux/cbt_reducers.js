import {
  SUBMIT_CBT_EVENT_PENDING,
  SUBMIT_CBT_EVENT_SUCCESS,
  SUBMIT_CBT_EVENT_FAILED,
  GET_CBT_EVENTS_PENDING,
  GET_CBT_EVENTS_FAILED,
  GET_CBT_EVENTS_SUCCESS
} from "./cbt_constants";

import { LOG_OUT_USER } from "../../App/Redux/app_constants";

import { resetState, updateObject } from "../../../ReduxHelpers/reduxHelpers";

const initialState = {
  cbt_events: "",
  cbt_isPending: false,
  cbt_error: ""
};

function cbtReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CBT_EVENT_PENDING:
      return setIsPending(state, action);
    case SUBMIT_CBT_EVENT_SUCCESS:
      return addCBTEvents(state, action);
    case SUBMIT_CBT_EVENT_FAILED:
      return setCBTError(state, action);
    case GET_CBT_EVENTS_PENDING:
      return setIsPending(state, action);
    case GET_CBT_EVENTS_SUCCESS:
      return setCBTEvents(state, action);
    case GET_CBT_EVENTS_FAILED:
      return setCBTError(state, action);
    case LOG_OUT_USER:
      return resetState(state, initialState);
    default:
      return state;
  }
}

function setIsPending(state, action) {
  return updateObject(state, { cbt_isPending: true });
}

function setCBTEvents(state, action) {
  if (action.payload && Array.isArray(action.payload)) {
    let events = action.payload.map(event => event);
    return updateObject(state, { cbt_events: events, cbt_isPending: false });
  } else {
    return setCBTError(state, action);
  }
}

function addCBTEvents(state, action) {
  if (action.payload.data) {
    let events =
      state.cbt_events.length <= 0 ? [] : state.cbt_events.map(event => event);
    // user added a new event
    events.unshift(action.payload.data);
    return updateObject(state, { cbt_events: events, cbt_isPending: false });
  } else {
    return setCBTError(state, action);
  }
}

function setCBTError(state, action) {
  return updateObject(state, {
    cbt_error: action.payload,
    cbt_isPending: false
  });
}

export const CBTReducer = cbtReducer;