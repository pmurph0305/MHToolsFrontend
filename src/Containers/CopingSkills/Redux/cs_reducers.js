import { combineReducers } from 'redux';

import {updateObject, updateItemByIndexInArray} from '../../../ReduxHelpers/reduxHelpers'

import {
    REQUEST_CS_USER_SUCCESS,
    REQUEST_CS_USER_FAILED,

    ADD_CS_USER_SUCCESS,
    ADD_CS_USER_FAILED,

    DELETE_CS_USER_SUCCESS,
    DELETE_CS_USER_FAILED,

    ADD_CS_SHARED_SUCCESS,
    ADD_CS_SHARED_FAILED,
} from './cs_constants'

const initialState = {
    coping_skills: [],
    error: '',
}


function copingSkillsReducer(state = [initialState], action) {
    switch(action.type) {
        case REQUEST_CS_USER_SUCCESS:
            return setCopingSkillsList(state, action);
        case REQUEST_CS_USER_FAILED:
            return setCopingSkillsError(state, action);
        case ADD_CS_USER_SUCCESS:
            return addNewCopingSkill(state, action);
        case ADD_CS_USER_FAILED:
            return setCopingSkillsError(state, action);
        case DELETE_CS_USER_SUCCESS:
            return removeSkillFromSkillList(state,action);
        case DELETE_CS_USER_FAILED:
            return setCopingSkillsError(state, action);
        case ADD_CS_SHARED_SUCCESS:
            // Need to handle case where user clicks add to coping lists and switches back to their own
            // coping list before the fetch's return in the action.
            return state;
        case ADD_CS_SHARED_FAILED:
            return setCopingSkillsError(state, action);
        
        default:
            return state;
    }
}



function addNewCopingSkill(state, action) {
    if (Array.isArray(action.payload) && action.payload[0]) {
        let skills = [];
        if (state.coping_skills.length) {
            skills = state.coping_skills.map(skill => {return skill});
        }
        skills.push(action.payload[0]);
        return updateObject(state, { coping_skills: skills });
    } else {
        return setCopingSkillsError(state, action);
    }
}

function removeSkillFromSkillList(state, action) {
    let removeId = parseInt(action.payload.skill_id);
    if (removeId) {
        let skills = state.coping_skills.filter(skill => skill.skill_id !== removeId)
        return updateObject(state, { coping_skills: skills});
    } else {
        console.log("UNKNOWN DELETE ISSUE", action.payload);
    }
}

function setCopingSkillsList(state, action) {
    // no length as no coping skills returns empty array.
    if (Array.isArray(action.payload)) {
        return updateObject(state, { coping_skills: action.payload })
    } else {
        return setCopingSkillsError(state, action);
    }
}

function setCopingSkillsError(state, action) {
    if (action.payload) {
        return updateObject(state, { error: action.payload });
    }
}



export const CSReducer = combineReducers({ skills: copingSkillsReducer })