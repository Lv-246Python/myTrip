import axios from 'axios';

const userUrl = '/api/v1/subscribe/';

export function getData(url, id) {
    return axios.get(url + id + '/subscribe/');
}

export function getUserOwnerData() {
    return axios.get(userUrl);
}

export function postData(url, id) {
    return axios.post(url + id + '/subscribe/');
}
