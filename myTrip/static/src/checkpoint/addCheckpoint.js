import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RaisedButton from 'material-ui/RaisedButton';

import {createCheckpointUpdateList} from './actions/index.js'

class AddCheckpoint extends React.Component{

    render(){
        const longitude = 1;
        const latitude = 2;
        const title = 'test6';
        const description = 'test';
        const position_number = 1;
        const source_url = '';
        return(
            <div>
                <RaisedButton label="Add Checkpoint" onClick={() => this.props.createCheckpointUpdateList(
                    longitude,
                    latitude,
                    title,
                    description,
                    position_number,
                    source_url)}/>
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
