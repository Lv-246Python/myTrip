import axios from "axios"

export const getProfile = () => {
    return axios.get('/api/v1/profile/')
    .then(response => this.setState({state: response.data}))
    .catch(error => console.log(error))
    }

export const putProfile = (name, surname, age, gender, hobbies) => {
        return axios.put('/api/v1/profile/', {
            name,
            surname,
            age,
            gender,
            hobbies
        })
    }


