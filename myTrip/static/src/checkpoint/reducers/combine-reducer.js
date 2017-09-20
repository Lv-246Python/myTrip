import {combineReducers} from 'redux';

import CheckpointsReducer from './checkpoint-list-reducer.js';
import ActiveCheckpoint from './active-checkpoint-reducer.js';
import ErrorReducer from './error-reducer.js';

const allReducers = combineReducers({
    checkpoints:CheckpointsReducer,
    activeCheckpoint:ActiveCheckpoint,
    errors:ErrorReducer
});

export default allReducers;
