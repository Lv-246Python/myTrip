import axios from 'axios';

export function deleteComment(commentId) {
    return axios.delete('api/v1/trip/1/comment/' + commentId + '/');
};

export function formatDate(date) {
    return new Date(date).toDateString();
};

export function putData(commentId, message) {
    return axios.put('api/v1/trip/1/comment/' + commentId + '/', {
        message
    })
};

export function postData(message) {
    return axios.post('api/v1/trip/1/comment/', {
        message
    })
};

export function getData() {
    return axios.get('api/v1/trip/1/comment/');
};
