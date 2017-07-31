import axios from "axios"

export function loginService(email, password) {
    return axios.post('/api/v1/auth/login/', {
            email,
            password
        })
}

export function registerService(email, password, first_name, last_name) {
    return axios.post('/api/v1/auth/register/', {
            email,
            password,
            first_name,
            last_name
        })
}

export function logoutService() {
    return axios.get('api/v1/auth/logout/')
}