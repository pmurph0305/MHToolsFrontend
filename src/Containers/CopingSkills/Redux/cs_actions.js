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
    
} from './cs_constants'

const URL = 'http://localhost:3001/'

export const addCopingSkill = (id, title, desc, shared) => (dispatch) => {
    dispatch({ type: ADD_CS_USER_PENDING });
    fetch(URL+'copingskills/'+id, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            title: title,
            desc: desc,
            shared: shared,
        })
    })
    .then(response => response.json())
    .then(data => { dispatch({ type: ADD_CS_USER_SUCCESS, payload: data })})
    .catch(err => { dispatch({ type: ADD_CS_USER_FAILED, payload: err })})
}

export const deleteCopingSkill = (id, skill_id) => (dispatch) => {
    dispatch({ type: DELETE_CS_USER_PENDING });
    fetch(URL+'copingskills/'+id+'/'+skill_id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => dispatch({ type: DELETE_CS_USER_SUCCESS, payload: data }))
    .catch(err => { dispatch({ type: DELETE_CS_USER_FAILED, payload: err })})
}

export const getCopingSkills = (id) => (dispatch) => {
    // dispatch action
    dispatch({ type: REQUEST_CS_USER_PENDING });
    fetch(URL+'copingskills/'+id)
    .then(response => response.json())
    // dispatch success.
    .then(data => {dispatch({ type: REQUEST_CS_USER_SUCCESS, payload: data })})
    // catch error.
    .catch(err=> {dispatch({ type:REQUEST_CS_USER_FAILED, payload: err })})
}

export const getSharedCopingSkills = (id, type) => (dispatch) => {
    // request shared coping skills for user.
    dispatch({ type: REQUEST_CS_USER_PENDING });
    fetch(URL+'copingskills/shared/'+id+'/'+type)
    .then(response => response.json())
    .then(data => {dispatch({ type: REQUEST_CS_USER_SUCCESS, payload: data })})
    .catch(err => dispatch({ type: REQUEST_CS_USER_FAILED, payload: err }))
}

export const addSharedCopingSkill = (id, skill_id) => (dispatch) => {
    dispatch({ type: ADD_CS_SHARED_PENDING });
    fetch(URL+'copingskills/shared/'+id+'/'+skill_id, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {dispatch({ type: ADD_CS_SHARED_SUCCESS, payload: data })})
    .catch(err => dispatch({ type: ADD_CS_SHARED_FAILED, payload: err }))
}


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