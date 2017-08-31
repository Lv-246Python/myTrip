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
import Map from './map.js'

import allReducers from './reducers/combine-reducer.js';

import './main.less';


const middleware = applyMiddleware(thunk, reduxPromise);
export const store = createStore(allReducers, composeWithDevTools(middleware));

class TripMap extends React.Component {
    render() {
        console.log(this.props.trip)
        return (
            <div >
                <Provider store={store}>
                    <div className='trip-test-page'>
                        <AddCheckpoint trip={this.props.trip}/>
                        <div style={{width:300, height:300}}>
                            <Map trip={this.props.trip}/>
                        </div>
                        <CheckpointList trip={this.props.trip}/>
                        <CheckpoinDetails trip={this.props.trip}/>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default TripMap;
