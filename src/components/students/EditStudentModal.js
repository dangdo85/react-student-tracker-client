import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import StudentForm from '../shared/StudentForm'
import { updateStudentSuccess, updateStudentFailure } from '../shared/AutoDismissAlert/messages'

const EditStudentModal = (props) => {
    const { 
        user, show, handleClose, 
        updateStudent, msgAlert, triggerRefresh
    } = props

    const [student, setStudent] = useState(props.student)

    console.log('student in edit modal', student)

    const handleChange = (e) => {
        setStudent(prevStudent => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            const updatedStudent = {
                [updatedName]: updatedValue
            }
            return {
                ...prevStudent,
                ...updatedStudent
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateStudent(user, student)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateStudentSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showStudent component
            // updated is in ShowStudent's useEffect's dependency array
            // changes to the updated boolean cause ShowStudent's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateStudentFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <StudentForm 
                    student={student}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Student"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditStudentModal