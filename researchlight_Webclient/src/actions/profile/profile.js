import axios from 'axios'
//import setAlert because in the action we are going to be setting some alerts when the profile is fetched

import {setAlert} from '../alert'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from '../types'

//get the current users profile
export const getUserProfile = () => async dispatch => {
    
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//create profile
export const createProfile = (formData,history,edit=false) => async dispatch => {

    try {
        const config = {
            headers:{'Content-Type':'application/json'}
        }
        const res = await axios.post('/api/profile',formData,config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit?'Profile updated':'Profile created','success'))
        if(!edit){
            history.push('/dashboard')
        }
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }

}