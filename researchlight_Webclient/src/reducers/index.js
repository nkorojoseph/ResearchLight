import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth/auth'
import profile from './profile/profile'

export default combineReducers ({
    alert,
    auth,
    profile,
})