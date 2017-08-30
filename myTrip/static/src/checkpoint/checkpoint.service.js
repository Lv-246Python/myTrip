import axios from "axios"

const trip_id = 1
const url = '/api/v1/trip/'+trip_id+'/checkpoint/'

function createCheckpoint(longitude, latitude, title, description, position_number, source_url) {
    return axios.post(url, {
            longitude,
            latitude,
            title,
            description,
            position_number,
            source_url})
}

function updateCheckpoint(longitude, latitude, title, description, position_number, source_url, checkpoint_id) {
    return axios.put(url+checkpoint_id+'/', {
            longitude,
            latitude,
            title,
            description,
            position_number,
            source_url})
}

function deleteCheckpoint(id) {
    return axios.delete(url+id+'/')
}

function getAllCheckpoints() {
    return axios.get(url);
}

module.exports = {
    createCheckpoint: createCheckpoint,
    deleteCheckpoint: deleteCheckpoint,
    getAllCheckpoints: getAllCheckpoints,
    updateCheckpoint: updateCheckpoint
}
