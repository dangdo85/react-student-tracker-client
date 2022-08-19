import StudentsIndex from './students/StudentsIndex'
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<StudentsIndex></StudentsIndex>
			<h2>Welcome to your Student Tracker.</h2>
			<h3><a href='/sign-in'>Sign in</a> or <a href='/sign-up'>Sign up</a>to continue</h3>
		</>
	)
}

export default Home
