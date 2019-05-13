import {
    SET_USER_ID
} from './app_constants'

import { updateObject } from '../../../ReduxHelpers/reduxHelpers'

const initialState = {
    user_id: -1
}

export const appReducer = (state = initialState, action ={}) => {
    switch(action.type) {
        case SET_USER_ID:
            return setUserID(state, action)
        default:
            return state;
    }
}

function setUserID (state, action) {
    return updateObject(state, { user_id: action.payload });
}

