import {
  // REQUEST_DM_TASKS_PENDING,
  REQUEST_DM_TASKS_SUCCESS,
  // REQUEST_DM_TASKS_FAILED,

  //  REQUEST_ADD_DM_TASK_PENDING,
  REQUEST_ADD_DM_TASK_SUCCESS,
  // REQUEST_ADD_DM_TASK_FAILED,

  //  REMOVE_DM_TASK_PENDING,
  REMOVE_DM_TASK_SUCCESS,
  //  REMOVE_DM_TASK_FAILED,
  REQUEST_CHECK_DM_TASK_SUCCESS,

  //  UPDATE_DM_TASK_PENDING,
  UPDATE_DM_TASK_SUCCESS,
  // UPDATE_DM_TASK_FAILED,
  CHANGE_DM_TASK_TEXT,
  SWAP_DM_TASK_RANKS,
  CHANGE_DM_TASK_EDITING
} from "./dm_constants";

import { LOG_OUT_USER } from "../../App/Redux/app_constants";

import { resetState } from "../../../ReduxHelpers/reduxHelpers";

// Task list state management
const initialState = {
  dm_error: "",
  dm_isPending: false,
  dm_taskList: [],
  dm_date: "",
  dm_editing: ""
};

// Reducer for getting/updating/creating/modifying tasks.
function dmTasksReducer(state = [initialState], action) {
  switch (action.type) {
    case REQUEST_DM_TASKS_SUCCESS:
      return setDMTaskList(state, action);
    case REQUEST_ADD_DM_TASK_SUCCESS:
      return addDMTask(state, action);
    // Toggling DM Tasks
    case REQUEST_CHECK_DM_TASK_SUCCESS:
      return toggleDMTask(state, action);
    // Changing DM Task text.
    case CHANGE_DM_TASK_TEXT:
      return changeDMTaskText(state, action);
    // Swaping positions of tasks in the list.
    case SWAP_DM_TASK_RANKS:
      return swapDMTaskRanks(state, action);
    case REMOVE_DM_TASK_SUCCESS:
      return removeDMTask(state, action);
    case UPDATE_DM_TASK_SUCCESS:
      return updateDMTasksCompleted(state, action);
    case CHANGE_DM_TASK_EDITING:
      return changeDMTaskEditing(state, action);

    case LOG_OUT_USER:
      return resetState(state, initialState);
    default:
      return state;
  }
}

export const DMReducer = dmTasksReducer;
// export const DMReducer = combineReducers({
//     tasks: dmTasksReducer,
// })

function changeDMTaskEditing(state, action) {
  const tasks = updateItemByIndexInArray(
    state.dm_taskList,
    action.payload.index,
    task => {
      task["editing"] = !task["editing"];
      return task;
    }
  );
  return updateObject(state, { dm_taskList: tasks });
}

// helper function to update objects properly.
function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

// helper function to update an item in array by index.
function updateItemByIndexInArray(array, itemIndex, updateItemCallback) {
  const updatedItems = array.map((item, index) => {
    if (index !== itemIndex) {
      return item;
    }
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });
  return updatedItems;
}

// adds a task to the task list.
function addDMTask(state, action) {
  if (Array.isArray(action.payload) && action.payload.length) {
    // map used to copy array so that it is re-rendered when added.
    let tasks = [];
    if (state.dm_taskList) {
      tasks = state.dm_taskList.map(task => task);
      action.payload[0]["updated"] = false;
    }
    tasks.push(action.payload[0]);
    return updateObject(state, { dm_isPending: false, dm_taskList: tasks });
  } else {
    return Object.assign({}, state.dm_taskList, {
      dm_isPending: false,
      dm_error: action.payload
    });
  }
}

// changes the description text of a task.
function changeDMTaskText(state, action) {
  const newTasks = updateItemByIndexInArray(
    state.dm_taskList,
    action.payload.index,
    task => {
      return updateObject(task, { task: action.payload.text, updated: true });
    }
  );
  return updateObject(state, { dm_taskList: newTasks });
}

// removes a task from the task list.
function removeDMTask(state, action) {
  let newTaskState = state.dm_taskList.filter(
    (task, index) => task["task_id"] !== action.payload
  );
  return updateObject(state, {
    dm_isPending: false,
    dm_taskList: newTaskState
  });
}

// Updates the state with the retrieved dm task list.
function setDMTaskList(state, action) {
  if (Array.isArray(action.payload) && action.payload.length) {
    let tasks = action.payload.map(task => {
      task["updated"] = false;
      return task;
    });
    return updateObject(state, {
      dm_isPending: false,
      dm_taskList: tasks,
      dm_date: tasks[0]["date"].slice(0, 10)
    });
  } else if (action.payload === "Unauthorized Request") {
    return updateObject(state, {
      dm_isPending: false,
      dm_error: "You are not logged in."
    });
  } else {
    return updateObject(state, {
      dm_isPending: false
    });
  }
}

// swaps the rank and position in list of two tasks.
function swapDMTaskRanks(state, action) {
  let rank1 = state.dm_taskList[action.payload.index1]["rank"];
  let rank2 = state.dm_taskList[action.payload.index2]["rank"];
  let newTasks = state.dm_taskList.map((task, index) => {
    if (index !== action.payload.index1 && index !== action.payload.index2) {
      return task;
    } else if (index === action.payload.index1) {
      task = state.dm_taskList[action.payload.index2];
      task["rank"] = rank1;
      task["updated"] = true;
      return task;
    } else {
      task = state.dm_taskList[action.payload.index1];
      task["rank"] = rank2;
      task["updated"] = true;
      return task;
    }
  });
  return updateObject(state, { dm_taskList: newTasks });
}

// handles toggling a task as complete / incomplete
function toggleDMTask(state, action) {
  // doesn't need to map array to update/re-render as the checkbox takes care of any visual difference.
  let tasks = state.dm_taskList;
  tasks[action.payload.index]["completed"] = action.payload.checked;
  return updateObject(state, { dm_taskList: tasks });
}

// Handles setting all updated properties of a task to false.
function updateDMTasksCompleted(state, action) {
  let newTaskState = state.dm_taskList.map(task => ({
    ...task,
    updated: false
  }));
  return updateObject(state, {
    dm_isPending: false,
    dm_taskList: newTaskState
  });
}
