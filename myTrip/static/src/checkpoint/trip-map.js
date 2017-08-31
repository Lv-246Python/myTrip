import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';

import {deleteCheckpoint, getAllCheckpoints} from './checkpoint.service.js'

import { Card, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import CheckpointIcon from 'material-ui/svg-icons/maps/pin-drop';

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
        return (
            <div >
                <Provider store={store}>
                    <div className='trip-test-page'>
                        <AddCheckpoint trip={this.props.trip}/>
                        <div style={{width:900, height:500}}>
                            <Map trip={this.props.trip}/>
                        </div>
                            <Card className='tripDescription'>
                                <CardHeader
                                    title={<h3>Checkpoints</h3>}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                    closeIcon={<CheckpointIcon style={{paddingRight:16}}/>}
                                    style={{width:884}}
                                />
                                    <CardMedia expandable={true}>
                                        <CheckpointList trip={this.props.trip}/>
                                        <CheckpoinDetails trip={this.props.trip}/>
                                    </CardMedia>
                            </Card>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default TripMap;
