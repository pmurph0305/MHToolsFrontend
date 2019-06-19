import { combineReducers } from "redux";

import {
  resetState,
  updateObject,
  updateItemByIndexInArray,
  updateItemByPropertyStringInArray
} from "../../../ReduxHelpers/reduxHelpers";

import {
  // GET users or shared coping skills.
  REQUEST_CS_USER_SUCCESS,
  REQUEST_CS_USER_PENDING,
  REQUEST_CS_USER_FAILED,

  // ADD entered Coping skill to user list.
  ADD_CS_USER_SUCCESS,
  ADD_CS_USER_PENDING,
  ADD_CS_USER_FAILED,

  // DELETE coping skill from user list.
  DELETE_CS_USER_SUCCESS,
  DELETE_CS_USER_PENDING,
  DELETE_CS_USER_FAILED,

  // Add shared coping skill to user list.
  ADD_CS_SHARED_SUCCESS,
  ADD_CS_SHARED_PENDING,
  ADD_CS_SHARED_FAILED,

  // Update user's coping skill.
  UPDATE_CS_SUCCESS,
  UPDATE_CS_PENDING,
  UPDATE_CS_FAILED,

  // CHANGE VIEWING
  CHANGE_CS_VIEWING,
  CHANGE_CS_SHARED_ORDER,

  // PUT Share a user's coping skill.
  REQUEST_CS_SHARE_PENDING,
  REQUEST_CS_SHARE_SUCCESS,
  REQUEST_CS_SHARE_FAILED,
  CHANGE_CS_EDITING,
  DISPLAY_EXAMPLE_COPING_SKILLS
} from "./cs_constants";

import { LOG_OUT_USER } from "../../App/Redux/app_constants";

const initialState = {
  coping_skills: "",
  error: "",
  viewing: "user",
  shared_order: 0,
  isPending: false
};

function copingSkillsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_CS_SHARE_PENDING:
    case REQUEST_CS_USER_PENDING:
    case ADD_CS_USER_PENDING:
    case DELETE_CS_USER_PENDING:
    case ADD_CS_SHARED_PENDING:
    case UPDATE_CS_PENDING:
      return setIsPending(state, action);

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

    case DISPLAY_EXAMPLE_COPING_SKILLS:
      return setExampleCopingSkills(state, action);

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

function setIsPending(state, action) {
  return updateObject(state, { isPending: true });
}

function setExampleCopingSkills(state, action) {
  return updateObject(state, {
    coping_skills: [
      {
        date_added: "2019-06-05",
        description:
          "This is where the description of a coping skill would go. It would tell you how the coping skill is used. If you register and sign in, you can add, edit, and delete things from your coping skills list.",
        title: "This is an example coping skill.",
        shared: true,
        skill_id: 1,
        shared_from_id: null,
        user_id: null
      },
      {
        date_added: "2019-06-05",
        description:
          "Right now, you can only view these example coping skills, and coping skills others have shared. Be sure to register or sign in to be able to create your own list of coping skills.",
        title: "Be sure to register or sign in to create your own list.",
        shared: true,
        skill_id: 0,
        user_id: null
      }
    ]
  });
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
    return updateObject(state, {
      coping_skills: updatedSkills,
      isPending: false
    });
  } else {
    return updateObject(state, { error: action.payload, isPending: false });
  }
}

function setCopingSkillAsShared(state, action) {
  if (Array.isArray(action.payload) && action.payload[0]) {
    let updatedSkills = updateItemByPropertyStringInArray(
      state.coping_skills,
      "skill_id",
      action.payload[0]["skill_id"],
      skill => {
        return updateObject(skill, { shared: true, isPending: false });
      }
    );
    return updateObject(state, {
      coping_skills: updatedSkills,
      isPending: false
    });
  } else {
    return updateObject(state, { error: action.payload, isPending: false });
  }
}

function changeCSEditing(state, action) {
  let updatedSkills = updateItemByIndexInArray(
    state.coping_skills,
    action.payload,
    skill => {
      return updateObject(skill, {
        editing: !skill["editing"],
        isPending: false
      });
    }
  );
  return updateObject(state, {
    coping_skills: updatedSkills,
    isPending: false
  });
}

function changeCSViewing(state, action) {
  if (action.payload) {
    return updateObject(state, { viewing: action.payload, isPending: false });
  } else {
    return state;
  }
}

function changeCSSharedOrder(state, action) {
  if (action.payload) {
    return updateObject(state, {
      shared_order: action.payload,
      isPending: false
    });
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
    return updateObject(state, { coping_skills: skills, isPending: false });
  } else {
    return setCopingSkillsError(state, action);
  }
}

function addSharedCopingSkill(state, action) {
  // if user is viewing the shared list still, don't add to the state.
  if (state.viewing === "shared") {
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
    return updateObject(state, { coping_skills: skills, isPending: false });
  } else {
    return state;
  }
}

function setCopingSkillsList(state, action) {
  // no length as no coping skills returns empty array.
  if (Array.isArray(action.payload)) {
    return updateObject(state, {
      coping_skills: action.payload,
      error: "",
      isPending: false
    });
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

export const CSReducer = combineReducers({
  skills: copingSkillsReducer,
  isPending: false
});
