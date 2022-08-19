import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllStudents = () => {
    return axios(`${apiUrl}/students`)
		// url: apiUrl + '/students',
		// method: 'GET',
		// headers: {
		// 	Authorization: `Token token=${user.token}`,
		// },
    // })
}

export const getOneStudent = (id) => {
    return axios(`${apiUrl}/students/${id}`)
		// url: `${apiUrl}/students/${id}`,
		// method: 'GET',
		// headers: {
		// 	Authorization: `Token token=${user.token}`,
		// },
    // })
}

// CREATE
export const createStudent = (user, newStudent) => {
	return axios({
		url: apiUrl + '/students',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { student: newStudent }
	})
}

// UPDATE
export const updateStudent = (user, updatedStudent) => {
    console.log('this is updatedStudent', updatedStudent)
	return axios({
		url: `${apiUrl}/students/${updatedStudent.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { student: updatedStudent }
	})
}

// DELETE
export const removeStudent = (user, studentId) => {
    return axios({
        url: `${apiUrl}/students/${studentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}