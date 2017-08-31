import axios from "axios"

// const trip_id = 1
const url = '/api/v1/trip/'

function createCheckpoint(longitude, latitude, title, description, position_number, source_url, trip_id) {
    return axios.post(url+trip_id+'/checkpoint/', {
            longitude,
            latitude,
            title,
            description,
            position_number,
            source_url})
}

function updateCheckpoint(longitude, latitude, title, description, position_number, source_url, trip_id, checkpoint_id) {
    return axios.put(url+trip_id+'/checkpoint/'+checkpoint_id+'/', {
            longitude,
            latitude,
            title,
            description,
            position_number,
            source_url})
}

function deleteCheckpoint(id, trip_id) {
    return axios.delete(url+trip_id+'/checkpoint/'+id+'/')
}

function getAllCheckpoints(trip_id) {
    return axios.get(url+trip_id+'/checkpoint/');
}

module.exports = {
    createCheckpoint: createCheckpoint,
    deleteCheckpoint: deleteCheckpoint,
    getAllCheckpoints: getAllCheckpoints,
    updateCheckpoint: updateCheckpoint
}
