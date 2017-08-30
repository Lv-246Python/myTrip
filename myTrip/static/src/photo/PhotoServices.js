import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function getTripPhotos(tripId) {
    return axios.get(tripUrl + tripId + '/photo/');
}

export function updatePhoto(tripId, photoId, title='', description='') {
    return axios.get(tripUrl + tripId + '/photo/' + photoId + '/', {
        title,
        description
    });
}
