import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function getTripPhotos(tripId, checkpointId='') {
    if (checkpointId){
        return axios.get(tripUrl + tripId +'/checkpoint/' + checkpointId + '/photo/');
    } else {
        return axios.get(tripUrl + tripId + '/photo/')
    };
}

export function updatePhoto(tripId, checkpointId='', photoId, title='', description='') {
    if (checkpointId){
        return axios.put(tripUrl + tripId +'/checkpoint/' + checkpointId + '/photo/', {
            title,
            description
        });
    } else {
        return axios.put(tripUrl + tripId + '/photo/' + photoId + '/', {
            title,
            description
        });
    }
}

export function uploadPhoto(tripId, checkpointId='',file, title='', description='') {
    if (checkpointId){
        return axios.post(tripUrl + tripId +'/checkpoint/' + checkpointId + '/photo/', file);
    } else {
        return axios.post(tripUrl + tripId + '/photo/', file)
    }
}

export function deletePhoto(tripId, checkpointId='', photoId) {
    if (checkpointId){
        return axios.delete(
            tripUrl + tripId +'/checkpoint/' + checkpointId + '/photo/'+ photoId + '/'
        );
    } else {
        return axios.delete(tripUrl + tripId + '/photo/' + photoId + '/')
    }
}

export function setForTripPage(tripId, checkpointId='', src) {
    if (checkpointId){
        return axios.get(tripUrl + tripId +'/checkpoint/' + checkpointId + '/');
    } else {
        return axios.put(tripUrl + tripId + '/', {
            src
        });
    }
}
