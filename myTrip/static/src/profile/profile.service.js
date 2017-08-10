import axios from "axios";

export const profileURL = '/api/v1/profile/';

export const getProfile = () => {
    return axios.get(profileURL)
    .then(response => {
        const data = response.data;
        this.setState({profile: data})})
        .catch(error => console.log(error))
    }

export const putProfile = (first_name, last_name, age, gender, hobbies, avatar, instagram) => {
        return axios.put(profileURL, {
            first_name,
            last_name,
            age,
            gender,
            hobbies,            
            avatar,
            instagram,
        })
    }

