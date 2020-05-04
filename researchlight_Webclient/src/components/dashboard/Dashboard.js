import React, {useEffect, Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getUserProfile} from '../../actions/profile/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardLinks from './DashboardLinks'

const Dashboard = ({getUserProfile,auth:{user},profile:{profile,loading}}) => {
    useEffect(()=>{
        getUserProfile()
    },[getUserProfile])

    return loading && profile === null ? 
    <Spinner></Spinner>:
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !=null ? <Fragment><DashboardLinks></DashboardLinks></Fragment> : 
        <Fragment>
            <p>You have not created a profile. Please add some info
                  <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
            </p></Fragment>}
    </Fragment>
}

Dashboard.prototype = {
    getUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
auth: state.auth,
profile: state.profile
})

export default connect(mapStateToProps,{getUserProfile})(Dashboard)