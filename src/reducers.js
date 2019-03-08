import {
    REQUEST_DM_TASKS_PENDING,
    REQUEST_DM_TASKS_SUCCESS,
    REQUEST_DM_TASKS_FAILED,
    CHANGE_DM_EDITING
} from './constants'


const initialStateEditing = {
    dm_editing: false,
}

export const setDMEditing = (state=initialStateEditing, action={}) => {
    switch(action.type) {
        case CHANGE_DM_EDITING:
            return Object.assign({}, state, { dm_editing: action.payload });
            // also works with object spread
            // return { ...state, searchField:action.payload}
        default:
            return state;
    }
}

const initialStateDMTasks = {
    dm_error: '',
    dm_isPending: false,
    dm_taskList: [],
    dm_date: ''
}

export const requestDMTaskList = (state=initialStateDMTasks, action={}) => {
    switch(action.type) {
        case REQUEST_DM_TASKS_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case REQUEST_DM_TASKS_SUCCESS:
            if (Array.isArray(action.payload) && action.payload.length) {
                let tasks = action.payload.map(task => {
                    task['updated'] = false;
                    return task;
                })
                return Object.assign({}, state, {dm_taskList: tasks, dm_date:tasks[0]['date'].slice(0,10), dm_isPending: false})
            } else {
                return Object.assign({}, state, { dm_error: action.payload })
            }
        case REQUEST_DM_TASKS_FAILED:
            return Object.assign({}, state, { dm_error: action.payload, dm_isPending: false })
        default:
            return state;
    }
}