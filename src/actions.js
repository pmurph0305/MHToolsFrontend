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

// sets the editing state.
export const setDMEditing = (boolean) => ({
    type: CHANGE_DM_EDITING,
    payload: boolean
})

// saves all dm tasks that have been updating through text or rank changes.
export const onDMSaveClick = (id, updatedTasks) => (dispatch) => {
    dispatch({ type: UPDATE_DM_TASK_PENDING });
    fetch('http://localhost:3001/dm/' + id, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            tasks: updatedTasks
        })
    })
    .then(response => response.json())
    .then(data=> dispatch({ type: UPDATE_DM_TASK_SUCCESS, payload: data }))
    .catch(err=> {dispatch({ type: UPDATE_DM_TASK_FAILED, payload: err })});
}

// gets the dm task list for the date
export const requestDMTasks = (id, date, change) => (dispatch) => {
    dispatch({ type: REQUEST_DM_TASKS_PENDING });
    if (change) {
        fetch('http://localhost:3001/dm/' + id + '/' + date + '/' + change, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(data => { dispatch({ type: REQUEST_DM_TASKS_SUCCESS, payload: data })})
        .catch(err => { dispatch({ type: REQUEST_DM_TASKS_FAILED, payload: err })})
    } else {
        dispatch({ type: REQUEST_DM_TASKS_PENDING });
        fetch('http://localhost:3001/dm/' + id + '/' + date, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(data => { dispatch({ type: REQUEST_DM_TASKS_SUCCESS, payload: data })})
        .catch(err => { dispatch({ type: REQUEST_DM_TASKS_FAILED, payload: err })})
    }
}

// adds a dm task to the newest date
export const addDMTask = (id, task, rank) => (dispatch) => {
    dispatch({ type: REQUEST_ADD_DM_TASK_PENDING });
    fetch('http://localhost:3001/dm/' + id, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            task: task,
            rank: rank,
        })
    })
    .then(response => response.json())
    .then(data => { dispatch({ type: REQUEST_ADD_DM_TASK_SUCCESS, payload: data })})
    .catch(err => { dispatch({ type: REQUEST_ADD_DM_TASK_FAILED, payload: err })})
}

// Toggles dm task completed based on checked checked
export const toggleDMTask = (id, task_id, index, checked) => (dispatch) => {
    fetch('http://localhost:3001/dm/' + id + '/' + task_id + '/' + checked, {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(data => { dispatch({ type: REQUEST_CHECK_DM_TASK_SUCCESS, payload: {index, checked} })})
}

// Changes the task name of a dm task.
export const changeDMTaskName = (index, text) => ({
    type: CHANGE_DM_TASK_TEXT,
    payload: {
        index: index,
        text: text,
    }
})

// swaps the rank of 2 dm tasks.
export const swapDMTaskRanks = (index1, index2) => ({
    type:SWAP_DM_TASK_RANKS,
    payload: {
        index1: index1,
        index2: index2
    }
})

export const removeDMTask = (id, task_id) => (dispatch) => {
    console.log("ID", id);
    console.log("TASK_ID", task_id);
    dispatch({ type: REMOVE_DM_TASK_PENDING });
    fetch('http://localhost:3001/dm/' + id + '/' + task_id, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
    })
    .then(response => response.json())
    .then(response => {
        dispatch({ type: REMOVE_DM_TASK_SUCCESS,
            payload: task_id
        })
        console.log(response);
    })
    .catch(err => dispatch({ type: REMOVE_DM_TASK_FAILED , payload: err}))
}

