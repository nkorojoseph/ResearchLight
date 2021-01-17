import React, {Fragment,useEffect} from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spiner from '../layout/Spinner'
import {getProfiles} from '../../actions/profile/profile'
//import profile from '../../reducers/profile/profile'
import ProfileItem from './ProfileItem'

export const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    
    useEffect(()=>{getProfiles()}, [getProfiles])
    
    return <Fragment>
        {loading ? <Spiner></Spiner>: <Fragment> 
         <h1 className="large text-primary">Researchers</h1>
         <p className="lead">
             <i className="fab fa-connectdevelop"></i>
             Browse and connect with Researchers
         </p>
         <div className="profiles">
             {profiles.length > 0 ? (
                 profiles.map(profile=> (
                     <ProfileItem key={profile._id} profile={profile} />
                 ))
                ): <h4>No profiles found...</h4> 
             }
         </div>
        </Fragment> }
    </Fragment>
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)
 