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

    CHANGE_DM_EDITING,
    CHANGE_DM_TASK_TEXT,
    SWAP_DM_TASK_RANKS
} from './constants'

// Editing state managment 
const initialEditState = {
    dm_editing: false
}

export const setDMEditing = (state=initialEditState, action={}) => {
    switch(action.type) {
        case CHANGE_DM_EDITING:
            return Object.assign({}, state, { dm_editing: action.payload });
            // also works with object spread
            // return { ...state, searchField:action.payload}
        default:
            return state;
    }
}


// Task list state management
const initialState = {
    dm_error: '',
    dm_isPending: false,
    dm_taskList: [],
    dm_date: '',
}

// TODO: split this thing up.
export const dmTasksReducer = (state=initialState, action={}) => {
    switch(action.type) {
        // For request for getting all the users DM Tasks.
        case REQUEST_DM_TASKS_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case REQUEST_DM_TASKS_SUCCESS:
            return setDMTaskList(state, action);
        case REQUEST_DM_TASKS_FAILED:
            return Object.assign({}, state, { dm_isPending: false, dm_error: action.payload})
        
        // For request to add a DM Task
        case REQUEST_ADD_DM_TASK_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case REQUEST_ADD_DM_TASK_SUCCESS:
            return addDMTask(state, action);
        case REQUEST_ADD_DM_TASK_FAILED:
            return Object.assign({}, state, { dm_isPending: false , dm_error: action.payload })

        // Toggling DM Tasks
        case REQUEST_CHECK_DM_TASK_SUCCESS:
            return toggleDMTask(state, action);

        // Changing DM Task text.
        case CHANGE_DM_TASK_TEXT:
            return changeDMTaskText(state, action);

        // Swaping positions of tasks in the list.        
        case SWAP_DM_TASK_RANKS:
            return swapDMTaskRanks(state,action);
        
        // Request for removing DM Task from list.
        case REMOVE_DM_TASK_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case REMOVE_DM_TASK_SUCCESS:
            return removeDMTask(state, action);
        case REMOVE_DM_TASK_FAILED:
            return Object.assign({}, state, { dm_isPending: false, dm_error: action.payload })

        // Request for updating all the tasks that were changed in edit mode.
        case UPDATE_DM_TASK_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case UPDATE_DM_TASK_SUCCESS:
            return updateDMTasksCompleted(state, action)
        case UPDATE_DM_TASK_FAILED:
            return Object.assign({}, state, { dm_isPending: false, dm_error: action.payload })

        default:
            return state;
    }


}

// helper function to update objects properly.
function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

// helper function to update an item in array by index.
function updateItemByIndexInArray(array, itemIndex, updateItemCallback) {
    const updatedItems = array.map((item, index) => {
        if (index!== itemIndex) {
            return item;
        }
        const updatedItem = updateItemCallback(item)
        return updatedItem;
    })
    return updatedItems;
}

// adds a task to the task list.
function addDMTask(state, action) {
    if (Array.isArray(action.payload) && action.payload.length) {
        let tasks = state.dm_taskList;
        let index = tasks.push(action.payload[0]);
        tasks[index]['updated'] = false;
        return updateObject(state, { dm_isPending : false, dm_taskList: tasks})
    } else {
        return updateObject(state, { dm_isPending: false, dm_error: action.payload })
    }
}

// changes the description text of a task.
function changeDMTaskText(state, action) {
    console.log(action.type);
    const newTasks = updateItemByIndexInArray(state.dm_taskList, action.payload.index, task => {
        return updateObject(task, { task: action.payload.text })
    })
    return updateObject(state, { dm_taskList: newTasks })
}

// removes a task from the task list.
function removeDMTask(state, action) {
    let newTaskState = state.dm_taskList.filter((task, index) => task['task_id'] !== action.payload);
    return updateObject( state, { dm_isPending: false, dm_taskList: newTaskState })
}

// Updates the state with the retrieved dm task list.
function setDMTaskList(state, action) {
    console.log("AH")
    if (Array.isArray(action.payload) && action.payload.length) {
        let tasks = action.payload.map(task => {
            task['updated'] = false;
            return task;
        })
        return updateObject(state, { dm_isPending: false, dm_taskList: tasks, dm_date:tasks[0]['date'].slice(0,10)})
    } else {
        return updateObject(state, { dm_isPending: false, dm_error: action.payload })
    }
}

// swaps the rank and position in list of two tasks.
function swapDMTaskRanks(state, action) {
    let task1 = state.dm_taskList[action.payload.index1];
    let task2 = state.dm_taskList[action.payload.index2];
    let newTasks = state.dm_taskList.map((task, index) => {
        if (index !== action.payload.index1 && index !== action.payload.index2 ) {
            return task;
        } else if (index === action.payload.index1) {
            task = task2;
            task['rank'] = task1['rank']
            task['updated'] = true;
            return task;
        } else {
            task = task1;
            task['rank'] = task2['rank']
            task['updated'] = true;
            return task;
        }
    })
    return updateObject(state, { dm_taskList: newTasks })
}

// handles toggling a task as complete / incomplete
function toggleDMTask(state, action) {
    let tasks = state.dm_taskList;
    tasks[action.payload.index]['completed'] = action.payload.checked;
    return updateObject(state, {  dm_taskList: tasks })
}

// Handles setting all updated properties of a task to false.
function updateDMTasksCompleted(state, action) {
    let newTaskState = state.dm_taskList.map(task => ({ ...task, updated: false}))
    return updateObject(state, { dm_isPending: false, dm_taskList: newTaskState })
}
