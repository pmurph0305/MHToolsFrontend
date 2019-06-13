import {
  SUBMIT_CBT_EVENT_PENDING,
  SUBMIT_CBT_EVENT_SUCCESS,
  SUBMIT_CBT_EVENT_FAILED,
  GET_CBT_EVENTS_PENDING,
  GET_CBT_EVENTS_FAILED,
  GET_CBT_EVENTS_SUCCESS
} from "./cbt_constants";

import { fetchURLWithJsonAuth } from "../../../ReduxHelpers/reduxHelpers";
import { SERVER_URL } from "../../../Constants/constants";
const CBT_URL = SERVER_URL + "cbt";

export const onSubmitCBTEvent = (id, data) => dispatch => {
  dispatch({ type: SUBMIT_CBT_EVENT_PENDING });
  fetchURLWithJsonAuth(`${CBT_URL}/${id}`, "POST", data)
    .then(response => response.json())
    .then(success => {
      dispatch({ type: SUBMIT_CBT_EVENT_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: SUBMIT_CBT_EVENT_FAILED, payload: err });
    });
};

export const onGetCBTEvents = id => dispatch => {
  dispatch({ type: GET_CBT_EVENTS_PENDING });
  fetchURLWithJsonAuth(`${CBT_URL}/events/${id}`)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: GET_CBT_EVENTS_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: GET_CBT_EVENTS_FAILED, payload: err });
    });
};
