import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';

import {deleteCheckpoint, getAllCheckpoints} from './checkpoint.service.js'

import AddCheckpoint from './addCheckpoint.js'
import CheckpointList from './checkpointList.js'
import CheckpoinDetails from './checkpointDetails.js'
import Mapp from './map.js'

import allReducers from './reducers/combine-reducer.js';

import './main.less';


const middleware = applyMiddleware(thunk, reduxPromise);
export const store = createStore(allReducers, composeWithDevTools(middleware));

class TripMap extends React.Component {
    render() {
        return (
            <div >
                <Provider store={store}>
                    <div className='trip-test-page'>
                        <AddCheckpoint/>
                        <div style={{width:600, height:300}}>
                            <Mapp/>
                        </div>
                        <CheckpointList/>
                        <CheckpoinDetails/>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default TripMap;
