import * as actions from "./dm_actions";
import {
  REQUEST_DM_TASKS_PENDING,
  REQUEST_DM_TASKS_SUCCESS,
  REQUEST_DM_TASKS_FAILED,
  REQUEST_ADD_DM_TASK_PENDING,
  REQUEST_ADD_DM_TASK_SUCCESS,
  REQUEST_ADD_DM_TASK_FAILED,
  REMOVE_DM_TASK_PENDING,
  REMOVE_DM_TASK_SUCCESS,
  REMOVE_DM_TASK_FAILED,
  REQUEST_CHECK_DM_TASK_PENDING,
  REQUEST_CHECK_DM_TASK_SUCCESS,
  REQUEST_CHECK_DM_TASK_FAILED,
  UPDATE_DM_TASK_PENDING,
  UPDATE_DM_TASK_SUCCESS,
  UPDATE_DM_TASK_FAILED,
  CHANGE_DM_TASK_EDITING,
  CHANGE_DM_TASK_TEXT,
  SWAP_DM_TASK_RANKS
} from "./dm_constants";

import configureStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import fetchMock from "fetch-mock";

const mockStore = configureStore([thunkMiddleware]);
import { SERVER_URL } from "../../../Constants/constants";

describe("DM Actions testing", () => {
  it("Should add a task correctly", () => {
    fetchMock.postOnce(`${SERVER_URL}dm/0`, {
      body: { task: "test", rank: 0, date: "2019-06-07" },
      headers: { "content-type:": "application/json" }
    });

    const expectedActions = [
      { type: REQUEST_ADD_DM_TASK_PENDING },
      {
        type: REQUEST_ADD_DM_TASK_SUCCESS,
        payload: { date: "2019-06-07", rank: 0, task: "test" }
      }
    ];
    const store = mockStore();
    store.dispatch(actions.addDMTask(0, "test", 0, "2019-06-07")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
