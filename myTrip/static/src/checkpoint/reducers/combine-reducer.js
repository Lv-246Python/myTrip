import {combineReducers} from 'redux';

import CheckpointsReducer from './checkpoint-list-reducer.js';
import ActiveCheckpoint from './active-checkpoint-reducer.js';

const allReducers = combineReducers({
    checkpoints: CheckpointsReducer,
    activeCheckpoint: ActiveCheckpoint
});

export default allReducers;