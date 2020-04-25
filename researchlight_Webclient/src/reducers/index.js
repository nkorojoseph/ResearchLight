import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth/auth'

export default combineReducers ({
    alert,
    auth
})