import {SET_ALERT, REMOVE_ALERT} from '../actions/types'

const initialState = []
//create the alert reducer that is called in the rootreducer and that is dispatched by SET and REMOVE ALERT actions
export default function(state=initialState,action){
    const {type,payload} = action
    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id != payload)
        default:
            return state;
    }
}