import service from '../checkpoint.service.js'
import {getAllCheckpoints} from '../actions/index.js'

export default function (state = null, action) {
    switch (action.type) {
        case 'GET-CHECKPOINTS':
            return action.payload;

        case 'CREATE-CHECKPOINT-UPDATE_LIST':
            console.log('reducer createcheckpoint',action.payload)
            console.log('reducer createcheckpoint',state)
            return action.payload;

        case 'DELETE-CHECKPOINT-UPDATE_LIST':
            return action.payload;

        case 'UPDATE-CHECKPOINT-UPDATE_LIST':
            return action.payload;    
    }
    return state;
}
