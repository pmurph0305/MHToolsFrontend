import {
    SET_USER_ID
} from './app_constants'

export const loginUser = id => dispatch => {
    dispatch({type:SET_USER_ID , payload:id})
}