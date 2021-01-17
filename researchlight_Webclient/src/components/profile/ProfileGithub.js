import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getGithubRepos} from '../../actions/profile/profile'

const ProfileGithub = ({username, getGithubRepos, repos}) => {

    useEffect(()=>{
        getGithubRepos(username)
    },[getGithubRepos(username)])

    return (

        <div>
            {
                username && (<h1>username</h1>)
            }
        </div>
    )
}

ProfileGithub.propTypes = {

}

const maptStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(maptStateToProps,{getGithubRepos})(ProfileGithub)
