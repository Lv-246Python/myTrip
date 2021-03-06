import axios from "axios"

const loginUrl = '/api/v1/auth/login/';
const registerUrl = '/api/v1/auth/register/';
const logoutUrl = '/api/v1/auth/logout/';
const facebookLoginUrl = '/api/v1/auth/facebook_login/'
const activationUrl = '/api/v1/auth/activation?hash=';

export function loginService(email, password) {
    return axios.post(loginUrl, {
            email,
            password
        })
}

export function registerService(email, password, first_name, last_name) {
    return axios.post(registerUrl, {
            email,
            password,
            first_name,
            last_name
        })
}

export function logoutService() {
    return axios.get(logoutUrl)
}

export function activationService(hash) {
    return axios.get(activationUrl + hash);
}
