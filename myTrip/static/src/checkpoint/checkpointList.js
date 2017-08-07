import React from "react";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CheckpoinItem from './checkpointItem.js';
import {getAllCheckpoints} from './actions/index.js'

class CheckpointList extends React.Component{

    componentDidMount() {
        this.props.getAllCheckpoints();
    }

    render(){
        if(this.props.checkpoints != null && this.props.checkpoints.length > 0){
            console.log('from container',this.props.checkpoints);
            var list = this.props.checkpoints.reverse();
                list = list.map(item =>{
                     return (
                        <CheckpoinItem key={item.id} checkpoint={item}/>
                    );
                })
                return(
                    <div>
                    <span><strong>Trip checkpoints</strong></span>
                        {list}
                    </div>
                );
        }
        else{
            return(
                <div>
                    <span><strong>No checkpoints yet</strong></span>
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
        {getAllCheckpoints: getAllCheckpoints},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckpointList);
