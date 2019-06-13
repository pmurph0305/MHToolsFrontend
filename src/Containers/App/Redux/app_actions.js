import { SET_USER_ID, LOG_OUT_USER } from "./app_constants";

export const loginUser = id => dispatch => {
  dispatch({ type: SET_USER_ID, payload: id });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOG_OUT_USER, payload: null });
};
