import axios from 'axios';

const tripUrl = 'api/v1/trip/';

export function deleteComment(tripId, commentId) {
    return axios.delete(tripUrl + tripId + '/comment/' + commentId + '/');
};

export function formatDate(date) {
    return new Date(date).toDateString();
};

export function putData(tripId, commentId, message) {
    return axios.put(tripUrl + tripId + '/comment/' + commentId + '/', {
        message
    })
};

export function postData(tripId, message) {
    return axios.post(tripUrl + tripId + '/comment/', {
        message
    })
};

export function getData(tripId) {
    return axios.get(tripUrl + tripId + '/comment/');
};
