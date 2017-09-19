import service from '../checkpoint.service.js'
import {store} from '../trip-map.js'

export const getAllCheckpoints = trip_id => {
    return {
        type: 'GET-CHECKPOINTS',
        payload: service.getAllCheckpoints(trip_id)
            .then(function(response){
                return response.data
            },function(error){
            dispatch({type:'ERROR',
                    payload:error.response})
        })
    }
};

export const checkpointDetails = checkpoint=> {
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

export const createCheckpointUpdateList = (longitude,latitude,title,description,position_number,source_url,trip_id)=>{
    return function(dispatch){
        service.createCheckpoint(longitude,
            latitude,
            title,
            description,
            position_number,
            source_url,
            trip_id)
        .then(function(response){
            return service.getAllCheckpoints(trip_id)
            .then(function(response){
                dispatch({type:'CREATE-CHECKPOINT-UPDATE_LIST',
                    payload:response.data})
            })
        },function(error){
            dispatch({type:'ERROR',
                    payload:error.response})
        })
    }
};

export const updateCheckpointUpdateList =  (longitude,latitude,title,description,position_number,source_url,trip_id,checkpoint_id) =>{
    return function(dispatch){
        service.updateCheckpoint(longitude,
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
                dispatch({type:'UPDATE-CHECKPOINT-UPDATE_LIST',
                    payload:response.data})
            })
        },function(error){
            dispatch({type:'ERROR',
                    payload:error.response})
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
        },function(error){
            dispatch({type:'ERROR',
                    payload:error.response})
        })
    }
};
