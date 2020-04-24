import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const Alert = ({alerts}) => alerts != null && alerts.length > 0 && alerts.map(alert=>(
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
))

Alert.propTypes = {
    alerts: PropTypes.func.isRequired,
}

//state.alert is coming from the root reducer. 
//whatever state you need comes from the rootReducer
const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
