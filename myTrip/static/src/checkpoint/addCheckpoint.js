import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RaisedButton from 'material-ui/RaisedButton';

import {createCheckpointUpdateList, getAllCheckpoints} from './actions/index.js'

class AddCheckpoint extends React.Component{
    constructor(props) {
        super(props);

    }

    addPoint(){
        console.log(this.props.checkpoints)
        const longitude = 23.999003;
        const latitude = 49.832721;
        
        const description = '';
        let position_number = 1
        if(this.props.checkpoints.length == 0){
            position_number = 1;
        }
        else{
            let length = this.props.checkpoints.length
            position_number = this.props.checkpoints[length - 1].position_number + 1;
        }
        const title = this.props.trip.title;
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
        if(this.props.checkpoints && this.props.checkpoints.length){
            return(
            <div>
                <RaisedButton label="Add Checkpoint" onClick={() => this.addPoint()}/>
            </div>
        );
        }
        else{
            return(
            <div>
                <RaisedButton label="Start Trip" onClick={() => this.addPoint()}/>
            </div>
        );
        }

            
    }
}

function mapStateToProps(state) {
    return {
        checkpoints: state.checkpoints
    };
}


function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {createCheckpointUpdateList : createCheckpointUpdateList,
        getAllCheckpoints : getAllCheckpoints},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddCheckpoint);
