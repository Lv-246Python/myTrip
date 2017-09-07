import axios from "axios"

// const trip_id = 1
const url = '/api/v1/auth/restore-password/'

function restorePassword(email) {
    return axios.post(url, {
            email})
}

function newPassword(password, token) {
    return axios.post(url+token+'/', {
            password})
}

module.exports = {
    restorePassword: restorePassword,
    newPassword:newPassword
}
