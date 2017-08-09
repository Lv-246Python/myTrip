import axios from "axios";

const url = '/api/v1/help/';

export const postHelp = (to, message, subject) => {
    return axios.post(url, {
        to,
        message,
        subject
    })
};
