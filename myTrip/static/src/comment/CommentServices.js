import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function deleteComment(tripId, checkpointId='', commentId) {
    return axios.delete(tripUrl + tripId + checkpointId + '/comment/' + commentId + '/');
};

export function putData(tripId, checkpointId='', commentId, message) {
    return axios.put(tripUrl + tripId + checkpointId + '/comment/' + commentId + '/', {
        message
    })
};

export function postData(tripId, checkpointId='', message) {
    return axios.post(tripUrl + tripId + checkpointId + '/comment/', {
        message
    })
};

export function getData(tripId, checkpointId='') {
    return axios.get(tripUrl + tripId + checkpointId + '/comment/');
};

export function formatDate(date) {
    return new Date(date).toDateString();
};
