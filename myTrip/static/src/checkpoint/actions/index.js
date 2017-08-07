import service from '../checkpoint.service.js'
import {store} from '../testing-page-for-checkpoints.js'

export function getAllCheckpoints() {
    console.log("getAllCheckpoints / index.js STORE",store.getState().activeCheckpoint);
    return {
        type: 'GET-CHECKPOINTS',
        payload: service.getAllCheckpoints()
        	.then(function(response){
        		return response.data
        	})
    }
};

export const checkpointDetails = (checkpoint) => {
	// console.log('action',checkpoint)
	console.log("checkpointDetails / index.js STORE",store.getState().activeCheckpoint);
    return {
        type: 'CHECKPOINT-DETAILS',
        payload: checkpoint
    }
};

export const closeDetails = () => {
	// console.log('state from index action',state)
	console.log("closeDetails / index.js STORE",store.getState().activeCheckpoint.id);
    return {
        type: 'CLOSE-DETAILS',
        payload: null
    }
};

export const createCheckpointUpdateList =  (longitude,latitude,title,description,position_number,source_url) =>{
	console.log("createCheckpointUpdateList / index.js STORE",store.getState().activeCheckpoint);
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

export const deleteUpadateList = id =>{
	console.log("deleteUpadateList / index.js STORE",store.getState().checkpoints);
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
