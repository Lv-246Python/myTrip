import service from '../checkpoint.service.js'
import {store} from '../testing-page-for-checkpoints.js'

export function getAllCheckpoints() {
    return {
        type: 'GET-CHECKPOINTS',
        payload: service.getAllCheckpoints()
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

export const createCheckpointUpdateList =  (longitude,latitude,title,description,position_number,source_url) =>{
    return {
        type: 'CREATE-CHECKPOINT-UPDATE_LIST',
        payload: service.createCheckpoint(longitude,
            latitude,
            title,
            description,
            position_number,
            source_url)
        .then(function(response){
            return service.getAllCheckpoints()
                .then(function(response){
                    return response.data
                });
        })
    }
};

export const updateCheckpointUpdateList =  (longitude,latitude,title,description,position_number,source_url,checkpoint_id) =>{
    return {
        type: 'UPDATE-CHECKPOINT-UPDATE_LIST',
        payload: service.updateCheckpoint(longitude,
            latitude,
            title,
            description,
            position_number,
            source_url,
            checkpoint_id)
        .then(function(response){
            return service.getAllCheckpoints()
                .then(function(response){
                    return response.data
                });
        })
    }
};

export const deleteUpadateList = id =>{
    var active =  store.getState().activeCheckpoint;
    var status = active;
    if(active != null && active.id == id){
        status = null
    }
    return function(dispatch){
        service.deleteCheckpoint(id)
        .then(function(response){
            return service.getAllCheckpoints()
            .then(function(response){
                dispatch({type:'DELETE-CHECKPOINT-UPDATE_LIST',
                    payload:response.data,
                    details:status})
            })
        })
    }
};
