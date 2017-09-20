import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function getTripPhotos(tripId, checkpointId='') {
    return axios.get(tripUrl + tripId +'/checkpoint/' + checkpointId + '/photo/');
}

export function updatePhoto(tripId, checkpointId='', photoId, title='', description='') {
    return axios.put(tripUrl + tripId + '/checkpoint/' + checkpointId + '/photo/', {
        title,
        description
    });

}

export function uploadPhoto(tripId, checkpointId='', file, title='', description='') {
    return axios.post(tripUrl + tripId + '/checkpoint/' + checkpointId + '/photo/', file);
}

export function deletePhoto(tripId, checkpointId='', photoId) {
    return axios.delete(
        tripUrl + tripId +'/checkpoint/' + checkpointId + '/photo/' + photoId + '/'
    );
}

export function setForTripPage(tripId, checkpointId='', src) {
    return axios.get(tripUrl + tripId + '/checkpoint/' + checkpointId + '/');
}
