import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
//import delete experience action which will be passed into the experience component
import {deleteExperience} from '../../actions/profile/profile'

//the parent component(dashboard component) will pass down the list of experiences
//from a registered researchers profile, hence we pass that as an argument
const Experience = ({experience,deleteExperience}) => {
console.log(experience)
    const experiences = experience.map(exp => (
 
    <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td >
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
        </td>
        <td>
            <button onClick={() => deleteExperience(exp._id) } className="btn btn-danger">Delete</button>
        </td>
    </tr>     
    ))
    
    return (
        <Fragment>
            <h2 className="my-2">Title</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        {//blank th for the delete and hide-sm to hide on small screens
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteExperience})(Experience)
