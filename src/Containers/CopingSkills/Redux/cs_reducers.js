import { combineReducers } from "redux";

import {
  resetState,
  updateObject,
  updateItemByIndexInArray,
  updateItemByPropertyStringInArray
} from "../../../ReduxHelpers/reduxHelpers";

import {
  REQUEST_CS_USER_SUCCESS,
  REQUEST_CS_USER_FAILED,
  ADD_CS_USER_SUCCESS,
  ADD_CS_USER_FAILED,
  DELETE_CS_USER_SUCCESS,
  DELETE_CS_USER_FAILED,
  ADD_CS_SHARED_SUCCESS,
  ADD_CS_SHARED_FAILED,
  CHANGE_CS_VIEWING,
  CHANGE_CS_SHARED_ORDER,
  CHANGE_CS_EDITING,
  REQUEST_CS_SHARE_SUCCESS,
  REQUEST_CS_SHARE_FAILED,
  UPDATE_CS_SUCCESS,
  UPDATE_CS_FAILED
} from "./cs_constants";

import { LOG_OUT_USER } from "../../App/Redux/app_constants";

const initialState = {
  coping_skills: [],
  error: "",
  viewing: "user",
  shared_order: 0
};

function copingSkillsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_CS_USER_SUCCESS:
      return setCopingSkillsList(state, action);
    case REQUEST_CS_USER_FAILED:
      return setCopingSkillsError(state, action);

    case ADD_CS_USER_SUCCESS:
      return addNewCopingSkill(state, action);
    case ADD_CS_USER_FAILED:
      return setCopingSkillsError(state, action);

    case DELETE_CS_USER_SUCCESS:
      return removeSkillFromSkillList(state, action);
    case DELETE_CS_USER_FAILED:
      return setCopingSkillsError(state, action);

    case ADD_CS_SHARED_SUCCESS:
      // Need to handle case where user clicks add to coping lists and switches back to their own
      // coping list before the fetch's return in the action.
      return addSharedCopingSkill(state, action);
    case ADD_CS_SHARED_FAILED:
      return setCopingSkillsError(state, action);

    case CHANGE_CS_VIEWING:
      return changeCSViewing(state, action);
    case CHANGE_CS_SHARED_ORDER:
      return changeCSSharedOrder(state, action);
    case CHANGE_CS_EDITING:
      return changeCSEditing(state, action);

    case REQUEST_CS_SHARE_SUCCESS:
      return setCopingSkillAsShared(state, action);
    case REQUEST_CS_SHARE_FAILED:
      return setCopingSkillsError(state, action);

    case UPDATE_CS_SUCCESS:
      return updateCopingSkill(state, action);
    case UPDATE_CS_FAILED:
      return setCopingSkillsError(state, action);

    case LOG_OUT_USER:
      return resetState(state, initialState);

    default:
      return state;
  }
}

function updateCopingSkill(state, action) {
  if (Array.isArray(action.payload) && action.payload[0]) {
    let updatedSkills = updateItemByPropertyStringInArray(
      state.coping_skills,
      "skill_id",
      action.payload[0]["skill_id"],
      skill => {
        return updateObject(skill, action.payload[0]);
      }
    );
    return updateObject(state, { coping_skills: updatedSkills });
  } else {
    return updateObject(state, { error: action.payload });
  }
}

function setCopingSkillAsShared(state, action) {
  if (Array.isArray(action.payload) && action.payload[0]) {
    let updatedSkills = updateItemByPropertyStringInArray(
      state.coping_skills,
      "skill_id",
      action.payload[0]["skill_id"],
      skill => {
        return updateObject(skill, { shared: true });
      }
    );
    return updateObject(state, { coping_skills: updatedSkills });
  } else {
    return updateObject(state, { error: action.payload });
  }
}

function changeCSEditing(state, action) {
  let updatedSkills = updateItemByIndexInArray(
    state.coping_skills,
    action.payload,
    skill => {
      return updateObject(skill, { editing: !skill["editing"] });
    }
  );
  return updateObject(state, { coping_skills: updatedSkills });
}

function changeCSViewing(state, action) {
  if (action.payload) {
    return updateObject(state, { viewing: action.payload });
  } else {
    return state;
  }
}

function changeCSSharedOrder(state, action) {
  if (action.payload) {
    return updateObject(state, { shared_order: action.payload });
  } else {
    return state;
  }
}

function addNewCopingSkill(state, action) {
  if (Array.isArray(action.payload) && action.payload[0]) {
    let skills = [];
    if (state.coping_skills.length) {
      skills = state.coping_skills.map(skill => {
        return skill;
      });
    }
    skills.push(action.payload[0]);
    return updateObject(state, { coping_skills: skills });
  } else {
    return setCopingSkillsError(state, action);
  }
}

function addSharedCopingSkill(state, action) {
  // if user is viewing the shared list still, don't add to the state.
  if (state.viewing === "shared") {
    console.log("shared", action.payload);
    return state;
  } else {
    // otherwise they are viewing their own list, so add the skill to the state.
    return addNewCopingSkill(state, action);
  }
}

function removeSkillFromSkillList(state, action) {
  let removeId = parseInt(action.payload.skill_id);
  if (removeId) {
    let skills = state.coping_skills.filter(
      skill => skill.skill_id !== removeId
    );
    return updateObject(state, { coping_skills: skills });
  } else {
    console.log("TODO: UNKNOWN DELETE ISSUE", action.payload);
  }
}

function setCopingSkillsList(state, action) {
  // no length as no coping skills returns empty array.
  if (Array.isArray(action.payload)) {
    return updateObject(state, { coping_skills: action.payload, error: "" });
  } else {
    return setCopingSkillsError(state, action);
  }
}

function setCopingSkillsError(state, action) {
  if (action.payload === "Unauthorized Request") {
    return updateObject(state, {
      coping_skills: [],
      error: "You are not logged in."
    });
  } else {
    return updateObject(state, {
      coping_skills: [],
      error: "Error getting Coping skills."
    });
  }
}

export const CSReducer = combineReducers({ skills: copingSkillsReducer });
