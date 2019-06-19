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
  cbt_events: [
    {
      situation: "An example of a CBT Thought record",
      automatic_thoughts:
        "This isn't a very good example, no one will like it.",
      alternative_thoughts:
        "It's still a pretty good example, and could help someone.",
      evidence_conclusions:
        "Having an example for people who are new to CBT is better than having no example at all. It still shows key components of a thought record. Be sure to register if you wish to submit and track your own CBT records.",
      date: "2019-06-05",
      rating_before: 75,
      rating_after: 25,
      thinking_styles: [true, true, false, false, false, true, false],
      cbt_id: 0,
      user_id: 0
    }
  ],
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
