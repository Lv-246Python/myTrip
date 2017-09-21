import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RaisedButton from 'material-ui/RaisedButton';
import service from './checkpoint.service.js'

import {createCheckpointUpdateList, getAllCheckpoints} from './actions/index.js'
import {userId} from '../utils'

class AddCheckpoint extends React.Component{
    constructor(props) {
        super(props);

    }

    addPoint() {
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

        service.CurrentPosition.then( response => {
            this.props.createCheckpointUpdateList(
                    response.lng,
                    response.lat,
                    title,
                    description,
                    position_number,
                    source_url,
                    tripId
                )},
            err => {
                this.props.createCheckpointUpdateList(
                    err.lng,
                    err.lat,
                    title,
                    description,
                    position_number,
                    source_url,
                    tripId
                )
            }
        );
    }

    render() {
        if(userId() === this.props.trip.user) {
            if(this.props.checkpoints && this.props.checkpoints.length) {
                return(
                    <div>
                        <RaisedButton
                            label="Add Checkpoint"
                            onClick={() => this.addPoint()}
                            fullWidth={true}
                        />
                    </div>
                );
            }
            else{
                return(
                    <div>
                        <RaisedButton
                            label="Start Trip"
                            onClick={() => this.addPoint()}
                            fullWidth={true}
                        />
                    </div>
                );
            }
        }else{
            return(
                <div>
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


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {createCheckpointUpdateList : createCheckpointUpdateList,
        getAllCheckpoints : getAllCheckpoints},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddCheckpoint);
