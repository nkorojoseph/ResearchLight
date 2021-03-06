import axios from 'axios'
import {setAlert} from '../alert'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST
} from '../types'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('api/posts')
        dispatch({
            type:GET_POSTS,
            payload: res.data
        })
    } catch(error){
        console.log(error)
        dispatch({ 
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//update likes

export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes:res.data}
        })
    } catch(error){
        console.log(error)
        dispatch({ 
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//remove likes

export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes:res.data}
        })
    } catch(error){
        dispatch({ 
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//delete a post

export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload: id
        })
    } catch(error){
        dispatch({ 
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//add a post

export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res = await axios.post(`api/posts`,formData,config)
        dispatch({
            type:ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Create','success'))
    } catch(error){
        dispatch({ 
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}