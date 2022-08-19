import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllStudents } from '../../api/students'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const StudentsIndex = (props) => {
    const [students, setStudents] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert, user } = props
    console.log('user ========', user)
    console.log('Props in StudentsIndex', props.msgAlert)

    useEffect(() => {
        console.log(props)
        getAllStudents(user)
            .then(res => setStudents(res.data.students))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Students',
                    message: messages.getStudentsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])
    console.log('students=====', students)
    if (error) {
        return <p>Error!</p>
    }

    // If students haven't been loaded yet, show a loading message
    if (!students) {
        return <LoadingScreen />
    } else if (students.length === 0) {
        return <p>No students yet. Better add some.</p>
    }

    const studentCards = students.map(student => (
        <Card style={{ width: '30%', margin: 5}} key={ student._id }>
            <Card.Header>{ student.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/students/${student._id}`}>View { student.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { studentCards }
        </div>
    )
}

export default StudentsIndex