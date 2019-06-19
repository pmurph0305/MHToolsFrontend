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
  CHANGE_DM_TASK_TEXT,
  SWAP_DM_TASK_RANKS,
  CHANGE_DM_TASK_EDITING
} from "./dm_constants";

import { LOG_OUT_USER } from "../../App/Redux/app_constants";

import { resetState, updateObject } from "../../../ReduxHelpers/reduxHelpers";
import {
  REQUEST_CS_SHARE_PENDING,
  REQUEST_CS_USER_PENDING,
  REQUEST_CS_SHARE_FAILED
} from "../../CopingSkills/Redux/cs_constants";

// Task list state management
const initialState = {
  dm_error: "",
  dm_isPending: false,
  dm_taskList: [
    {
      completed: true,
      date: "2019-06-05",
      rank: 0,
      task_id: 1,
      task: "These are example tasks",
      updated: false,
      user_id: -1
    },
    {
      completed: false,
      date: "2019-06-05",
      rank: 1,
      task_id: 2,
      task: "You are not signed in, or this is still loading",
      updated: false,
      user_id: -1
    },
    {
      completed: false,
      date: "2019-06-05",
      rank: 2,
      task_id: 3,
      task: "So you can only see these examples",
      updated: false,
      user_id: -1
    },
    {
      completed: true,
      date: "2019-06-05",
      rank: 3,
      task_id: 4,
      task:
        "Register or sign in to be able to add, edit, and track daily maintenance tasks!",
      updated: false,
      user_id: -1
    }
  ],
  dm_date: "",
  dm_editing: ""
};

// Reducer for getting/updating/creating/modifying tasks.
function dmTasksReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADD_DM_TASK_PENDING:
    case REQUEST_CHECK_DM_TASK_PENDING:
    case REQUEST_CS_SHARE_PENDING:
    case REQUEST_CS_USER_PENDING:
    case REQUEST_DM_TASKS_PENDING:
    case REMOVE_DM_TASK_PENDING:
    case UPDATE_DM_TASK_PENDING:
      return setRequestPending(state, action);

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

    case REQUEST_ADD_DM_TASK_FAILED:
    case REQUEST_CHECK_DM_TASK_FAILED:
    case REQUEST_DM_TASKS_FAILED:
    case REQUEST_CS_SHARE_FAILED:
    case REMOVE_DM_TASK_FAILED:
    case UPDATE_DM_TASK_FAILED:
      return handleDMRequestFailed(state, action);

    case LOG_OUT_USER:
      return resetState(state, initialState);
    default:
      return state;
  }
}

export const DMReducer = dmTasksReducer;

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
    let date = state.dm_date;
    if (!date) {
      date = action.payload[0].date.slice(0, 10);
    }
    return updateObject(state, {
      dm_isPending: false,
      dm_taskList: tasks,
      dm_date: date,
      dm_error: ""
    });
  } else {
    return Object.assign({}, state.dm_taskList, {
      dm_isPending: false,
      dm_error: action.payload
    });
  }
}

function changeDMTaskEditing(state, action) {
  if (action.payload.index >= 0) {
    const tasks = [...state.dm_taskList];
    tasks[action.payload.index]["editing"] = !tasks[action.payload.index][
      "editing"
    ];
    return updateObject(state, { dm_taskList: tasks });
  }
  return state;
}

// changes the description text of a task.
function changeDMTaskText(state, action) {
  if (action.payload.text) {
    const newTasks = [...state.dm_taskList];
    newTasks[action.payload.index]["task"] = action.payload.text;
    return updateObject(state, { dm_taskList: newTasks });
  }
  return state;
}

function handleDMRequestFailed(state, action) {
  if (action.payload) {
    return updateObject(state, {
      dm_error: action.payload,
      dm_isPending: false
    });
  }
}

// removes a task from the task list.
function removeDMTask(state, action) {
  let newTaskState = state.dm_taskList.filter(
    (task, index) => task["task_id"] !== action.payload
  );
  return updateObject(state, {
    dm_isPending: false,
    dm_taskList: newTaskState,
    dm_error: ""
  });
}

// Updates the state with the retrieved dm task list.
function setDMTaskList(state, action) {
  if (Array.isArray(action.payload) && action.payload.length) {
    // Correctly recieved users task list.
    let tasks = action.payload.map(task => {
      task["updated"] = false;
      return task;
    });
    return updateObject(state, {
      dm_isPending: false,
      dm_taskList: tasks,
      dm_date: tasks[0]["date"].slice(0, 10),
      dm_error: ""
    });
  } else if (action.payload === "Unauthorized Request") {
    // User isn't logged in.
    return updateObject(state, {
      dm_isPending: false,
      dm_error: "You are not logged in.",
      dm_taskList: []
    });
  }
  // New user, no data.
  return updateObject(state, {
    dm_isPending: false,
    dm_taskList: []
  });
}

// swaps the rank and position in list of two tasks.
function swapDMTaskRanks(state, action) {
  if (action.payload.index1 >= 0 && action.payload.index2 >= 0) {
    let tasks = [...state.dm_taskList];
    let task1 = tasks[action.payload.index1];
    task1.rank = tasks[action.payload.index2].rank;
    task1.updated = true;
    tasks[action.payload.index2].rank = tasks[action.payload.index1].rank;
    tasks[action.payload.index2].updated = true;
    tasks[action.payload.index1] = tasks[action.payload.index2];
    tasks[action.payload.index2] = task1;
    return updateObject(state, { dm_taskList: tasks });
  }
  return state;
}

function setRequestPending(state, action) {
  return updateObject(state, { dm_isPending: true });
}

// handles toggling a task as complete / incomplete
function toggleDMTask(state, action) {
  if (action.payload.index && action.payload.checked) {
    let tasks = [...state.dm_taskList];
    tasks[action.payload.index]["completed"] = action.payload.checked;
    return updateObject(state, { dm_taskList: tasks });
  }
  return state;
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
