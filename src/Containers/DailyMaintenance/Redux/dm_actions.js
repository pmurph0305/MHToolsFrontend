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
  REQUEST_CHECK_DM_TASK_SUCCESS,
  UPDATE_DM_TASK_PENDING,
  UPDATE_DM_TASK_SUCCESS,
  UPDATE_DM_TASK_FAILED,
  CHANGE_DM_TASK_EDITING,
  CHANGE_DM_TASK_TEXT,
  SWAP_DM_TASK_RANKS
} from "./dm_constants";

import { SERVER_URL } from "../../../Constants/constants";
import { fetchURLWithJsonAuth } from "../../../ReduxHelpers/reduxHelpers";

const DM_URL = SERVER_URL + "dm";

/** Dispatches actions that saves all dm tasks that have been updating through text or rank changes.
 * @param  {number} id user_id
 * @param  {Object[]} updatedTasks list of dm_tasks that need to be updated
 */
export const onDMSaveClick = (id, updatedTasks) => dispatch => {
  dispatch({ type: UPDATE_DM_TASK_PENDING });
  fetchURLWithJsonAuth(`${DM_URL}/${id}`, "PUT", { tasks: updatedTasks })
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_DM_TASK_SUCCESS, payload: data }))
    .catch(err => {
      dispatch({ type: UPDATE_DM_TASK_FAILED, payload: err });
    });
};

/** Dispatches actions that request the tasks for either current date, or closest date before/after date.
 * @param  {number} id user's id
 * @param  {string} date date currently displayed YYYY-MM-DD
 * @param  {number} change 0 for current date, (-1 or 1) increase or decrease from current date.
 */
export const requestDMTasks = (id, date, change) => dispatch => {
  dispatch({ type: REQUEST_DM_TASKS_PENDING });
  if (change && date) {
    fetchURLWithJsonAuth(`${DM_URL}/${id}/${date}/${change}`, "GET")
      .then(response => response.json())
      .then(data => {
        dispatch({ type: REQUEST_DM_TASKS_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: REQUEST_DM_TASKS_FAILED, payload: err });
      });
  } else if (date) {
    fetchURLWithJsonAuth(`${DM_URL}/${id}/${date}`, "GET")
      .then(response => response.json())
      .then(data => {
        dispatch({ type: REQUEST_DM_TASKS_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: REQUEST_DM_TASKS_FAILED, payload: err });
      });
  }
};

/** Dispatches actions that adds a task to the newest date
 * @param  {number} id id of the task to be added
 * @param  {string} task text of the task to be added
 * @param  {number} rank new rank of the task to be added.
 */
export const addDMTask = (id, task, rank, date) => dispatch => {
  dispatch({ type: REQUEST_ADD_DM_TASK_PENDING });
  fetchURLWithJsonAuth(`${DM_URL}/${id}`, "POST", {
    task: task,
    rank: rank,
    date: date
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: REQUEST_ADD_DM_TASK_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: REQUEST_ADD_DM_TASK_FAILED, payload: err });
    });
};

/** Dispatches action(s) that update a task as (in)complete.
 * @param  {} id user_id of the user
 * @param  {} task_id task_id of the task
 * @param  {} index index of the task in the task array
 * @param  {} checked is the task completed
 */
export const toggleDMTask = (id, task_id, index, checked) => dispatch => {
  fetchURLWithJsonAuth(`${DM_URL}/${id}/${task_id}/${checked}`, "PUT")
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: REQUEST_CHECK_DM_TASK_SUCCESS,
        payload: { index, checked }
      });
    });
};

/** Dispatches an action that changes the task name of a dm task.
 * @param  {number} index index of task in dm_taskList
 * @param  {string} text new string of the task
 */
export const changeDMTaskName = (index, text) => dispatch => {
  dispatch({
    type: CHANGE_DM_TASK_TEXT,
    payload: {
      index: index,
      text: text
    }
  });
};

/** Dispatches an action that swaps two tasks in a users task list.
 * @param  {} index1 index of a task in the dm_taskList to be swapped with index2
 * @param {number} index2 other index in the dm_taskList array to be swapped
 */
export const swapDMTaskRanks = (index1, index2) => dispatch => {
  dispatch({
    type: SWAP_DM_TASK_RANKS,
    payload: {
      index1: index1,
      index2: index2
    }
  });
};

/**
 * Dispatches an action that marks a task as being edited.
 * @param  {number} index Index of Task in dm_taskList
 */
export const changeDMTaskEditing = index => dispatch => {
  dispatch({ type: CHANGE_DM_TASK_EDITING, payload: { index: index } });
};

/** Dispatches an action that requests the removal of a task from the users list in the database.
 * @param  {number} id user_id
 * @param  {number} task_id task_id of the task from dm_taskList to be removed
 */
export const removeDMTask = (id, task_id) => dispatch => {
  dispatch({ type: REMOVE_DM_TASK_PENDING });
  fetchURLWithJsonAuth(`${DM_URL}/${id}/${task_id}`, "DELETE")
    .then(response => response.json())
    .then(response => {
      dispatch({ type: REMOVE_DM_TASK_SUCCESS, payload: task_id });
    })
    .catch(err => dispatch({ type: REMOVE_DM_TASK_FAILED, payload: err }));
};
