import axios from 'axios'
//import setAlert because in the action we are going to be setting some alerts when the profile is fetched

import {setAlert} from '../alert'

import {
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_REPOS
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

//get all profiles
export const getProfiles = () => async dispatch => {

    dispatch({
        type: CLEAR_PROFILE
    })
    
    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        //console.log(error)
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//get  profile by id
export const getProfileById = userId => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`)

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

//get github repo
export const getGithubRepos = (username) => async dispatch => {
    
    try {
        const res = await axios.get(`/api/profile/github/${username}`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        //console.log(error)
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

//Add experience
export const addExperience = (formData,history) => async dispatch => {
    try {
        console.log(formData)
        const config = {
            headers:{'Content-Type':'application/json'}
        }
        const res = await axios.put('/api/profile/experience',formData,config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience profile updated','success'))
        
            history.push('/dashboard')
        
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

//Add education
export const addEducation = (formData,history) => async dispatch => {
    try {
        const config = {
            headers:{'Content-Type':'application/json'}
        }
        const res = await axios.put('/api/profile/education',formData,config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education profile updated','success'))
        
            history.push('/dashboard')
        
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

//delete experience
export const deleteExperience = id => async dispatch=> {
    
    try {
         //hit endpoint
        const res = await axios.delete(`/api/profile/experience/${id}`)

        //dispatch update profile after deleting a profile to update the user profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile experience deleted successfully','danger'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//delete experience
export const deleteEducation = id => async dispatch=> {
    
    try {
         //hit endpoint
        const res = await axios.delete(`/api/profile/education/${id}`)

        //dispatch update profile after deleting a profile to update the user profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile education deleted successfully','danger'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//delete account and profile. 

export const deleteAccount = () => async dispatch=> {
    
   if(window.confirm('Do you want to delete your account? This can not be undone')){
        try {
            //hit endpoint
            //const res = await axios.delete(`/api/profile`)

            //dispatch update profile after deleting a profile to update the user profile
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: ACCOUNT_DELETED 
            })
            dispatch(setAlert('Your account has been deleted','danger'))
            } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
   } 
  
}