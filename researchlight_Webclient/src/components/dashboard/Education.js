import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {deleteEducation} from '../../actions/profile/profile'

//the parent component(dashboard component) will pass down the list of experiences
//from a registered researchers profile, hence we pass that as an argument
const Education = ({education, deleteEducation}) => {

  
    const educations = education.map(edu => (
 
    <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.fieldofstudy}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td >
            <Moment format='YYYY/MM/DD'>{ edu.from} </Moment> - {
                edu.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{ edu.to} </Moment>)
            }
        </td>
        <td>
            <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
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
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation}) (Education)
