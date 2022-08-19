import { useState } from 'react'
import { createStudent } from '../../api/students'
import { useNavigate } from 'react-router-dom'
import { createStudentSuccess, createStudentFailure } from '../shared/AutoDismissAlert/messages'
import StudentForm from '../shared/StudentForm'

const CreateStudent = (props) => {
    console.log('these are the props in createStudent\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [student, setStudent] = useState({
        name: '',
        grade: '',
        absences: '',
        improvementPlan: ''
    })

    console.log('this is student in createStudent', student)

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

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createStudent(user, student)
            // if we're successful, navigate to the show page for the new student
            .then(res => { navigate(`/students/${res.data.student.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createStudentSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createStudentFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <StudentForm 
            student={ student } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new student!"
        />
    )
}

export default CreateStudent