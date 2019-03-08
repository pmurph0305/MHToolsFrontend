import {
    REQUEST_DM_TASKS_PENDING,
    REQUEST_DM_TASKS_SUCCESS,
    REQUEST_DM_TASKS_FAILED,
    CHANGE_DM_EDITING
} from './constants'

export const setDMEditing = (boolean) => ({
    type: CHANGE_DM_EDITING,
    payload: boolean
})

export const requestDMTasks = (id, date, change) => (dispatch) => {
    console.log("id", id);
    console.log("date", date);
    if (change) {
        dispatch({ type: REQUEST_DM_TASKS_PENDING });
        fetch('http://localhost:3001/dm/' + id + '/' + date + '/' + change, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(data => { dispatch({ type: REQUEST_DM_TASKS_SUCCESS, payload: data })})
        .catch(err => { dispatch({ type: REQUEST_DM_TASKS_FAILED, payload: err })})
    } else {
        console.log("NOCHANGE");
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