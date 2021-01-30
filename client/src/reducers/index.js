import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth/auth'
import profile from './profile/profile'
import post from './post/Post'

export default combineReducers ({
    alert,
    auth,
    profile,
    post,
})