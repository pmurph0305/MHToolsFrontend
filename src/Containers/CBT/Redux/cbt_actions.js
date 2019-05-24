import {
  SUBMIT_CBT_EVENT_PENDING,
  SUBMIT_CBT_EVENT_SUCCESS,
  SUBMIT_CBT_EVENT_FAILED
} from "./cbt_constants";

import { fetchURLWithJsonAuth } from "../../../ReduxHelpers/reduxHelpers";

const CBT_URL = "http://localhost:3001/cbt";

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
