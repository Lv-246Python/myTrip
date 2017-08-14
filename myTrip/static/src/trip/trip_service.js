import axios from 'axios';

const tripUrl = '/api/v1/trip/';

export function getTrip() {
    return axios.get(`tripUrl${this.tripId}/`);
};

export function editTrip(tripId, title, description, status) {
    return axios.put(`tripUrl${this.tripId}/`, {
        title, description, status
    })
};

export function deleteTrip(tripId) {
    return axios.delete(`tripUrl${this.tripId}/`);
};

export function formatDate(date) {
    return new Date(date).toDateString();
};
