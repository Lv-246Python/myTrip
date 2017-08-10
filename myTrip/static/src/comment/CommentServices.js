import axios from 'axios';

export function deleteComment(tripId, commentId) {
    return axios.delete('api/v1/trip/' + tripId + '/comment/' + commentId + '/');
};

export function formatDate(date) {
    return new Date(date).toDateString();
};

export function putData(tripId, commentId, message) {
    return axios.put('api/v1/trip/' + tripId + '/comment/' + commentId + '/', {
        message
    })
};

export function postData(tripId, message) {
    return axios.post('api/v1/trip/' + tripId + '/comment/', {
        message
    })
};

export function getData(tripId) {
    return axios.get('api/v1/trip/' + tripId + '/comment/');
};
