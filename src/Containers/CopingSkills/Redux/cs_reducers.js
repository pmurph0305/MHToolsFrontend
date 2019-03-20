import { combineReducers } from 'redux';

import {updateObject, updateItemByIndexInArray} from '../../../ReduxHelpers/reduxHelpers'

import {
    REQUEST_CS_USER_SUCCESS,
    REQUEST_CS_USER_FAILED
} from './cs_constants'

const initialState = {
    coping_skills: [],
    error: ''
}


function copingSkillsReducer(state = [initialState], action) {
    switch(action.type) {
        case REQUEST_CS_USER_SUCCESS:
            return setCopingSkillsList(state, action);
        case REQUEST_CS_USER_FAILED:
            return setCopingSkillsError(state, action);
        default:
            return state;
    }
}

function setCopingSkillsList(state, action) {
    if (Array.isArray(action.payload) && action.payload.length) {
        let skills = action.payload.map(item => {
            return item;
        })
        return updateObject(state, { coping_skills: action.payload })
    } else {
        return updateObject(state, { error: action.payload })
    }
}

function setCopingSkillsError(state, action) {
    if (action.payload) {
        return updateObject(state, { error: action.payload });
    }
}

export const CSReducer = combineReducers({ skills: copingSkillsReducer })