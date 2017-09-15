import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function getTrip(tripId) {
    return axios.get(tripUrl + tripId + '/');
};

export function editTrip(tripId, title, src, description, status) {
    return axios.put(tripUrl + tripId + '/', {
        title, src, description, status
    })
};

export function deleteTrip(tripId) {
    return axios.delete(tripUrl + tripId + '/');
};

export function formatDate(date) {
    return new Date(date).toDateString();
};
