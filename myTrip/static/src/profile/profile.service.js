import axios from "axios";

export const profileURL = '/api/v1/profile/';

export const putProfile = (first_name, last_name, age, gender, hobbies, avatar) => {
        return axios.put(profileURL, {
            first_name,
            last_name,
            age,
            gender,
            hobbies,            
            avatar,
        })
    }

