import { REQUEST_DM_HISTORY_SUCCESS, REQUEST_PHQ9_HISTORY_SUCCESS } from "./history_constants";

import { updateObject } from '../../../ReduxHelpers/reduxHelpers'

const initialState = {
    phq9: [],
    dm: []
}

export function historyReducer(state = [initialState], action) {
    switch(action.type) {
        case REQUEST_DM_HISTORY_SUCCESS:
            return setDailyMaintenanceHistory(state, action);
        case REQUEST_PHQ9_HISTORY_SUCCESS:
            return setPHQ9History(state, action);
        default:
            return state;
    }
}

function setDailyMaintenanceHistory(state, action) {
    if (Array.isArray(action.payload)) {
        return updateObject(state, { dm: action.payload })
    }
}

function setPHQ9History(state, action) {
    if (Array.isArray(action.payload)) {
        return updateObject(state, { phq9: action.payload })
    }
}