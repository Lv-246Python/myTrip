import axios from "axios"

export let getProfile = () => {
    return axios.get('/api/v1/profile/')
    .then(response => this.setState({state: response.data}))
    .catch(error => console.log(error))
    }

export let putProfile = (name, surname, age, gender, hobbies) => {
        return axios.put('/api/v1/profile/', {
            name,
            surname,
            age,
            gender,
            hobbies
        })
    }


