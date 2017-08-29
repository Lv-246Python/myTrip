import axios from 'axios';

const tripUrl = '/api/v1/trip/';

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
