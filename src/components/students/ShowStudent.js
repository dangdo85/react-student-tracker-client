import { 
    useState,
    useEffect, 
} from 'react'

import { 
    useParams,
    useNavigate 
} from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { 
    Container,
    Card,
    Button 
} from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneStudent, updateStudent, removeStudent } from '../../api/students'
import messages from '../shared/AutoDismissAlert/messages'
import EditStudentModal from './EditStudentModal'

// We need to get the student's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

const ShowStudent = (props) => {
    const [student, setStudent] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const[updated, setUpdated] = useState(false)
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { msgAlert, user } = props
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneStudent(id, user)
            .then(res => setStudent(res.data.student))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting student',
                    message: messages.getStudentsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    const removeTheStudent = () => {
        removeStudent(user, student.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeStudentSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing student',
                    message: messages.removeStudentFailure,
                    variant: 'danger'
                })
            })
    }

    if (!student) {
        return <LoadingScreen />
    }

    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{ student.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Name: { student.name }</small></div>
                        <div><small>Grade: { student.grade }</small></div>
                        <div><small>Absences: { student.absences }</small></div>
                        <div><small>Improvement Plan: { student.improvementPlan }</small></div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                        {
                            student.owner && user && student.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Student
                                </Button>
                                <Button onClick={() => removeTheStudent()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Remove {student.name}
                                </Button>
                            </>
                            :
                            null
                        }
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default ShowStudent