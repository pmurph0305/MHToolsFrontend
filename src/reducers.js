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


// TODO: split this thing up.
export const dmTasksReducer = (state=initialStateDMTasks, action={}) => {
    switch(action.type) {

        case REQUEST_DM_TASKS_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case REQUEST_DM_TASKS_SUCCESS:
            if (Array.isArray(action.payload) && action.payload.length) {
                let tasks = action.payload.map(task => {
                    task['updated'] = false;
                    return task;
                })
                return Object.assign({}, state, { dm_isPending: false, dm_taskList: tasks, dm_date:tasks[0]['date'].slice(0,10)})
            } else {
                return Object.assign({}, state, { dm_isPending: false, dm_error: action.payload })
            }
        case REQUEST_DM_TASKS_FAILED:
            return Object.assign({}, state, { dm_isPending: false, dm_error: action.payload})
        

        case REQUEST_ADD_DM_TASK_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case REQUEST_ADD_DM_TASK_SUCCESS:
            if (Array.isArray(action.payload) && action.payload.length) {
                let tasks = state.dm_taskList;
               let index = tasks.push(action.payload[0]);
               tasks[index]['updated'] = false;
                return Object.assign({}, state, { dm_isPending : false, dm_taskList: tasks})
            } else {
                return Object.assign({}, state, {  dm_isPending: false, dm_error: action.payload })
            }
        case REQUEST_ADD_DM_TASK_FAILED:
            return Object.assign({}, state, { dm_isPending: false , dm_error: action.payload })


        case REQUEST_CHECK_DM_TASK_SUCCESS:
            // this is actually not re-rendering state, but the checkbox checks on click anyway, and is not determined by state.
            let tasks = state.dm_taskList;
            tasks[action.payload.index]['completed'] = action.payload.checked;
            return Object.assign({}, state, {  dm_taskList: tasks })
        
        
        case CHANGE_DM_TASK_TEXT:
            console.log(action.payload);
            let newTaskState = state.dm_taskList.map((task, index) => {
                if (index !== action.payload.index) {
                    return task;
                } else {
                    task['task'] = action.payload.text;
                    task['updated'] = true;
                    return task;
                }
            }) 
            return Object.assign({}, state, { dm_isPending: false, dm_taskList: newTaskState })
        
        
        case SWAP_DM_TASK_RANKS:
            let t1 = state.dm_taskList[action.payload.index1];
            let t2 = state.dm_taskList[action.payload.index2];
            // Swap array items & change rank values, mark as updated.
            newTaskState = state.dm_taskList.map((task, index) => {
                if (index !== action.payload.index1 && index !== action.payload.index2) {
                    return task;
                } else if (index === action.payload.index1) {
                    task = t2;
                    task['rank'] = t1['rank']
                    task['updated'] = true;
                    return task;
                } else {
                    task = t1;
                    task['rank'] = t2['rank']
                    task['updated'] = true;
                    return task;
                }
            })
            return Object.assign({}, state, { dm_isPending: false, dm_taskList: newTaskState })
        
        
        case REMOVE_DM_TASK_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case REMOVE_DM_TASK_SUCCESS:
            newTaskState = state.dm_taskList.filter((task, index) => task['task_id'] !== action.payload);
            return Object.assign({}, state, { dm_isPending: false, dm_taskList: newTaskState })
        case REMOVE_DM_TASK_FAILED:
            return Object.assign({}, state, { dm_isPending: false, dm_error: action.payload })


        case UPDATE_DM_TASK_PENDING:
            return Object.assign({}, state, { dm_isPending: true })
        case UPDATE_DM_TASK_SUCCESS:
            newTaskState = state.dm_taskList.map(task => ({ ...task, updated: false}))
            return Object.assign({}, state, { dm_isPending: false, dm_taskList: newTaskState })
        case UPDATE_DM_TASK_FAILED:
            return Object.assign({}, state, { dm_isPending: false, dm_error: action.payload })

        default:
            return state;
    }
}