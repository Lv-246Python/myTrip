import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RaisedButton from 'material-ui/RaisedButton';

import {createCheckpointUpdateList, testpidor} from './actions/index.js'

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

        navigator.geolocation.getCurrentPosition( 
            data => {
                this.props.createCheckpointUpdateList(
                    data.coords.longitude,
                    data.coords.latitude,
                    title,
                    description,
                    position_number,
                    source_url
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
                    source_url
                )
            }, 
            { enableHighAccuracy:true }
        )

// //////////////////////////////////////////

        // navigator.geolocation.getCurrentPosition(function(data){
        //     console.log(data.coords.longitude, data.coords.latitude)
        // },
        //     function(err){console.log(err.message)})
    }

    render(){
        // const longitude = 1;
        // const latitude = 2;
        // const title = 'test6';
        // const description = 'test';
        // const position_number = 1;
        // const source_url = '';
        return(
            <div>
                <RaisedButton label="Add Checkpoint" onClick={() => this.addPoint()}/>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {createCheckpointUpdateList: createCheckpointUpdateList,
            testpidor: testpidor},
        dispatch);
}

export default connect(null, matchDispatchToProps)(AddCheckpoint);
