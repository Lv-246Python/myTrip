import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function getTripPhotos(tripId) {
    return axios.get(tripUrl + tripId + '/photo/');
}

export function updatePhoto(tripId, photoId, title='', description='') {
    return axios.put(tripUrl + tripId + '/photo/' + photoId + '/', {
        title,
        description
    });
}

export function uploadPhoto(tripId, file, title='', description='') {
    return axios.post(tripUrl + tripId + '/photo/', file) 
}

export function deletePhoto(tripId, photoId) {
    return axios.delete(tripUrl + tripId + '/photo/' + photoId + '/')
}

export function setForTripPage(tripId, src) {
    return axios.put(tripUrl + tripId + '/', {
        src
    });
}

