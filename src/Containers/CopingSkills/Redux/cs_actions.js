import {
    // GET Coping skills.
    REQUEST_CS_USER_SUCCESS,
    REQUEST_CS_USER_PENDING,
    REQUEST_CS_USER_FAILED,

} from './cs_constants'

export const getCopingSkills = (id) => (dispatch) => {
    // dispatch action
    dispatch({ type: REQUEST_CS_USER_PENDING });
    fetch('http://localhost:3001/copingskills/'+id)
    .then(response => response.json())
    // dispatch success.
    .then(data => {dispatch({ type: REQUEST_CS_USER_SUCCESS, payload: data })})
    // catch error.
    .catch(err=> {dispatch({ type:REQUEST_CS_USER_FAILED, payload: err})})
}

export const getSharedCopingSkills = (id, type) => (dispatch) => {
    // request shared coping skills for user.
    dispatch({ type: REQUEST_CS_USER_PENDING });
    fetch('http://localhost:3001/copingskills/shared/'+id+'/'+type)
    .then(response => response.json())
    .then(data => {dispatch({ type: REQUEST_CS_USER_SUCCESS, payload: data })})
    .catch(err => dispatch({ type: REQUEST_CS_USER_FAILED, payload: err }))
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