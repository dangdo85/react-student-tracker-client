import { 
    Form,
    Button, 
    Container
} from 'react-bootstrap'

const StudentForm = (props) => {
    const { student, handleChange, handleSubmit } = props

    return (
    <Container className="justify-content-center">    
        <Form onSubmit={(handleSubmit)}>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                placeholder="What is the student's name?"
                name="name"
                id="name"
                value={ student.name }
                onChange={ handleChange }
            />
            <Form.Label htmlFor="grade">Grade</Form.Label>
            <Form.Control
                placeholder="What is the student's current grade in class?"
                type="number"
                name="grade"
                id="grade"
                value={ student.grade }
                onChange={ handleChange }
            />
            <Form.Label htmlFor="absences">Absences</Form.Label>
            <Form.Control
                placeholder="Number of absences the student has for class?"
                type="number"
                name="absences"
                id="absences"
                value={ student.absences }
                onChange={ handleChange }
            />
            <Form.Label htmlFor="improvementPlan">Improvement Plan</Form.Label>
            <Form.Control
                placeholder="What is the student's improvement plan?"
                type="string"
                name="improvementPlan"
                id="improvementPlan"
                value={ student.improvementPlan }
                onChange={ handleChange }
            />
            <Button type="submit">Submit</Button>
        </Form>
    </Container>
    )
}

export default StudentForm