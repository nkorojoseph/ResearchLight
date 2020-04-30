//fetch profile data when we login

import { GET_PROFILE, PROFILE_ERROR } from "../../actions/types";

//fetch a users profile when we visit another another Researchers profile
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state=initialState, action){
    const {type, payload} = action 

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
    
        default:
            return state
    }
}