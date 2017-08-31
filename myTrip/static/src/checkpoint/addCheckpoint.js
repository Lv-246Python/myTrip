import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RaisedButton from 'material-ui/RaisedButton';

import {createCheckpointUpdateList} from './actions/index.js'

class AddCheckpoint extends React.Component{
    constructor(props) {
        super(props);
        
    }

    addPoint(){
        const longitude = 24.017239;
        const latitude = 49.834529;
        const title = 'test4';
        const description = 'test';
        const position_number = 1;
        const source_url = '';
        const tripId = this.props.trip.id

        navigator.geolocation.getCurrentPosition( 
            data => {
                this.props.createCheckpointUpdateList(
                    data.coords.longitude,
                    data.coords.latitude,
                    title,
                    description,
                    position_number,
                    source_url,
                    tripId
                )
            },
            err => {
                console.log(err.message);
                this.props.createCheckpointUpdateList(
                    longitude,
                    latitude,
                    title,
                    description,
                    position_number,
                    source_url,
                    tripId
                )
            }, 
            { enableHighAccuracy:true }
        )
    }

    render(){
        return(
            <div>
                <RaisedButton label="Add Checkpoint" onClick={() => this.addPoint()}/>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {createCheckpointUpdateList: createCheckpointUpdateList},
        dispatch);
}

export default connect(null, matchDispatchToProps)(AddCheckpoint);
