import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function getCommentUrl(tripId, checkpointId='', photoId='', commentId=''){
    let url = tripUrl + tripId + '/';
    if (checkpointId) {
        url += 'checkpoint/' + checkpointId + '/';
        if (photoId) {
            url += 'photo/' + photoId + '/';
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        } else {
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        }
    } else {
        if (photoId) {
            url += 'photo/' + photoId + '/';
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        } else {
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        }
    }
    return url + 'comment/';
}

export function getData(tripId, checkpointId='', photoId='') {
    return axios.get(getCommentUrl(tripId, checkpointId, photoId));
};

export function postData(tripId, checkpointId='', photoId='', message) {
    return axios.post(getCommentUrl(tripId, checkpointId, photoId), { message })
};

export function putData(tripId, checkpointId='', photoId='', commentId, message) {
    return axios.put(getCommentUrl(tripId, checkpointId, photoId, commentId), { message })
};

export function deleteComment(tripId, checkpointId='', photoId='', commentId) {
    return axios.delete(getCommentUrl(tripId, checkpointId, photoId, commentId));
};

export function formatDate(date) {
    return new Date(date).toDateString();
};
