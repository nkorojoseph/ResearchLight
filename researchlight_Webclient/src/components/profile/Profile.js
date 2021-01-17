import React, {Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect}  from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfileById} from '../../actions/profile/profile'
import {Link} from 'react-router-dom'

const Profile = (
    {
        getProfileById, 
        profile:{profile, loading}, 
        auth, 
        match
    }
    ) => {
    useEffect(() => {
        //match.params.id gets the id from the url
        getProfileById(match.params.id)
    }, [getProfileById] )
     
    return (
        <Fragment>
        { 
            profile === null || loading ? (<Spinner/>) :
            (
                <Fragment>  
                    <Link to="/profiles" className="btn btn-light">
                        Back to profiles
                    </Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user.id === profile.user.id && (<Link to='/edit-profile' className='btn btn-dark'>
                        Edit profile
                    </Link>
                    )}
                </Fragment>
            )
         }
        </Fragment>
    )
}

Profile.propTypes = {

}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

//will be needing getProfileById action and 
export default connect(mapStateToProps,{getProfileById})(Profile)
