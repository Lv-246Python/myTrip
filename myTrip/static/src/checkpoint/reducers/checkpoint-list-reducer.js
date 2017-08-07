import service from '../checkpoint.service.js'
import {getAllCheckpoints} from '../actions/index.js'
// console.log(service.getAllCheckpoints());

export default function (state = null, action) {
    switch (action.type) {
        case 'GET-CHECKPOINTS':
            return action.payload;

        case 'CREATE-CHECKPOINT-UPDATE_LIST':
            console.log('in reducer',action)
            return action.payload;

        case 'DELETE-CHECKPOINT-UPDATE_LIST':
            console.log('in reducer',action)
            return action.payload;
            
    }
    return state;
}