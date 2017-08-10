import axios from "axios";

const url = '/api/v1/help/';

export const postHelp = (to, subject, message) => {
    return axios.post(url, {
        to,
        subject,
        message
    })
};
