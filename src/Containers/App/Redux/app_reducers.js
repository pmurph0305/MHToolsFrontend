import { SET_USER_ID, LOG_OUT_USER } from "./app_constants";

import { updateObject, resetState } from "../../../ReduxHelpers/reduxHelpers";

const initialState = {
  user_id: null
};

export const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return setUserID(state, action);
    case LOG_OUT_USER:
      return resetState(state, initialState);
    default:
      return state;
  }
};

function setUserID(state, action) {
  return updateObject(state, { user_id: action.payload });
}
