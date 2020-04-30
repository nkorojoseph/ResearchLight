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
