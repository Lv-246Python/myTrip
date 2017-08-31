import service from '../checkpoint.service.js'
import {store} from '../trip-map.js'

export function getAllCheckpoints(trip_id) {
    return {
        type: 'GET-CHECKPOINTS',
        payload: service.getAllCheckpoints(trip_id)
            .then(function(response){
                return response.data
            })
    }
};

export const checkpointDetails = (checkpoint) => {
    return {
        type: 'CHECKPOINT-DETAILS',
        payload: checkpoint
    }
};

export const closeDetails = () => {
    return {
        type: 'CLOSE-DETAILS',
        payload: null
    }
};

export const createCheckpointUpdateList =  (longitude,latitude,title,description,position_number,source_url, trip_id) =>{
    return {
        type: 'CREATE-CHECKPOINT-UPDATE_LIST',
        payload: service.createCheckpoint(longitude,
            latitude,
            title,
            description,
            position_number,
            source_url,
            trip_id)
        .then(function(response){
            return service.getAllCheckpoints(trip_id)
                .then(function(response){
                    return response.data
                });
        })
    }
};

export const updateCheckpointUpdateList =  (longitude,latitude,title,description,position_number,source_url,trip_id,checkpoint_id) =>{
    return {
        type: 'UPDATE-CHECKPOINT-UPDATE_LIST',
        payload: service.updateCheckpoint(longitude,
            latitude,
            title,
            description,
            position_number,
            source_url,
            trip_id,
            checkpoint_id)
        .then(function(response){
            return service.getAllCheckpoints(trip_id)
                .then(function(response){
                    return response.data
                });
        })
    }
};

export const deleteUpadateList = (id, trip_id) =>{
    var active =  store.getState().activeCheckpoint;
    var status = active;
    if(active != null && active.id == id){
        status = null
    }
    return function(dispatch){
        service.deleteCheckpoint(id, trip_id)
        .then(function(response){
            return service.getAllCheckpoints(trip_id)
            .then(function(response){
                dispatch({type:'DELETE-CHECKPOINT-UPDATE_LIST',
                    payload:response.data,
                    details:status})
            })
        })
    }
};
