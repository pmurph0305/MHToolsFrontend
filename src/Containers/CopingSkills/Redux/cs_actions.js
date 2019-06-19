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

  // display examples for non signed in users.
  DISPLAY_EXAMPLE_COPING_SKILLS,

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
  CHANGE_CS_EDITING
} from "./cs_constants";
import { SERVER_URL } from "../../../Constants/constants";
import { fetchURLWithJsonAuth } from "../../../ReduxHelpers/reduxHelpers";
const COPINGSKILLS_URL = SERVER_URL + "copingskills";

export const addCopingSkill = (id, title, desc, shared) => dispatch => {
  dispatch({ type: ADD_CS_USER_PENDING });
  fetchURLWithJsonAuth(`${COPINGSKILLS_URL}/${id}`, "POST", {
    title: title,
    desc: desc,
    shared: shared
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: ADD_CS_USER_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: ADD_CS_USER_FAILED, payload: err });
    });
};

export const addSharedCopingSkill = (id, skill_id) => dispatch => {
  dispatch({ type: ADD_CS_SHARED_PENDING });
  fetchURLWithJsonAuth(`${COPINGSKILLS_URL}/shared/${id}/${skill_id}`, "POST")
    .then(response => response.json())
    .then(data => {
      dispatch({ type: ADD_CS_SHARED_SUCCESS, payload: data });
    })
    .catch(err => dispatch({ type: ADD_CS_SHARED_FAILED, payload: err }));
};

export const changeCSEditing = index => dispatch => {
  dispatch({ type: CHANGE_CS_EDITING, payload: index });
};

export const changeCSSharedOrder = order => dispatch => {
  dispatch({ type: CHANGE_CS_SHARED_ORDER, payload: order });
};

export const changeCSViewing = viewing => dispatch => {
  dispatch({ type: CHANGE_CS_VIEWING, payload: viewing });
};

export const deleteCopingSkill = (id, skill_id) => dispatch => {
  dispatch({ type: DELETE_CS_USER_PENDING });
  fetchURLWithJsonAuth(`${COPINGSKILLS_URL}/${id}/${skill_id}`, "DELETE")
    .then(response => response.json())
    .then(data => dispatch({ type: DELETE_CS_USER_SUCCESS, payload: data }))
    .catch(err => {
      dispatch({ type: DELETE_CS_USER_FAILED, payload: err });
    });
};

export const displayExampleCopingSkills = () => dispatch => {
  dispatch({ type: DISPLAY_EXAMPLE_COPING_SKILLS });
};

export const getCopingSkills = id => dispatch => {
  // dispatch action
  dispatch({ type: REQUEST_CS_USER_PENDING });
  fetchURLWithJsonAuth(`${COPINGSKILLS_URL}/${id}`)
    .then(response => response.json())
    // dispatch success.
    .then(data => {
      dispatch({ type: REQUEST_CS_USER_SUCCESS, payload: data });
    })
    // catch error.
    .catch(err => {
      dispatch({ type: REQUEST_CS_USER_FAILED, payload: err });
    });
};

export const getSharedCopingSkills = (id, type) => dispatch => {
  // request shared coping skills for user.
  dispatch({ type: REQUEST_CS_USER_PENDING });
  fetchURLWithJsonAuth(`${COPINGSKILLS_URL}/shared/${id}/${type}`)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: REQUEST_CS_USER_SUCCESS, payload: data });
    })
    .catch(err => dispatch({ type: REQUEST_CS_USER_FAILED, payload: err }));
};

export const putShareCopingSkill = (id, skill_id) => dispatch => {
  dispatch({ type: REQUEST_CS_SHARE_PENDING });
  fetchURLWithJsonAuth(`${COPINGSKILLS_URL}/share/${id}/${skill_id}`, "PUT")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_CS_SHARE_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: REQUEST_CS_SHARE_FAILED, payload: err }));
};

export const updateUserCopingSkill = (
  id,
  skill_id,
  title,
  desc
) => dispatch => {
  dispatch({ type: UPDATE_CS_PENDING });
  fetchURLWithJsonAuth(`${COPINGSKILLS_URL}/${id}/${skill_id}`, "PUT", {
    title: title,
    desc: desc
  })
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_CS_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: UPDATE_CS_FAILED, payload: err }));
};

// // Coping Skills Routes
// // Get all user's coping skills.
// app.get('/copingskills/:id', copingSkills.handleCopingSkillsGet(db));
// // delete coping skill from a users list.
// app.delete('/copingskills/:id/:skill_id', copingSkills.handleCopingSkillsDelete(db));
// // Insert new coping skill to users list. (And share if shared).
// app.post('/copingskills/:id', copingSkills.handleCopingSkillsPost(db));
// // Update existing skill on users list.
// app.put('/copingskills/:id/:skill_id', copingSkills.handleCopingSkillsPut(db));

// // Shared coping skills.
// // Get shared skills by new, top, or rand.
// app.get('/copingskills/shared/:id/:type', copingSkills.handleCopingSkillsSharedGet(db));
// // Add a shared skill to users own list.
// app.post('/copingskills/shared/:id/:skill_id', copingSkills.handleCopingSkillsSharedPost(db));
