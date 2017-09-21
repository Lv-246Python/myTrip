import axios from "axios"

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

var CurrentPosition = new Promise(function(resolve, reject) {
    //default center
        const center ={lat:49.832721,lng:23.999003}
        navigator.geolocation.getCurrentPosition( 
                        data => {
                            center.lat = data.coords.latitude;
                            center.lng = data.coords.longitude
                            resolve(center)
                        },
                        err => {
                            reject(center)
                        }, 
                        { enableHighAccuracy:true }
        );
})

module.exports = {
    createCheckpoint:createCheckpoint,
    deleteCheckpoint:deleteCheckpoint,
    getAllCheckpoints:getAllCheckpoints,
    updateCheckpoint:updateCheckpoint,
    CurrentPosition:CurrentPosition
}
