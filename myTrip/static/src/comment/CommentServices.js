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


/*
export function deleteComment(tripId, tripPhotoId='',
                              checkpointId='', checkpointPhotoId='', commentId) {
    return axios.delete(tripUrl + tripId + tripPhotoId + checkpointId +
                        checkpointPhotoId + '/comment/' + commentId + '/');
};

export function putData(tripId, tripPhotoId='',
                        checkpointId='', checkpointPhotoId='', commentId, message) {
    return axios.put(tripUrl + tripId + tripPhotoId + checkpointId +
                     checkpointPhotoId + '/comment/' + commentId + '/', {
        message
    })
};

export function postData(tripId, tripPhotoId='', checkpointId='',
                         checkpointPhotoId='', message) {
    return axios.post(tripUrl + tripId + tripPhotoId + checkpointId +
                      checkpointPhotoId + '/comment/', {
        message
    })
};

export function getData(tripId, tripPhotoId='',
                        checkpointId='', checkpointPhotoId='') {
    return axios.get(tripUrl + tripId + tripPhotoId + checkpointId +
                     checkpointPhotoId + '/comment/');
};

export function formatDate(date) {
    return new Date(date).toDateString();
};
*/
