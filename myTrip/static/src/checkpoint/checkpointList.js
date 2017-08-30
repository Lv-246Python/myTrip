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
            var list = this.props.checkpoints;
                list = list.map(item =>{
                     return (
                        <CheckpoinItem key={item.id} checkpoint={item}/>
                    );
                })
                return(
                    <div>
                    <span><strong>Trip checkpoints</strong></span>
                        <ol>
                            {list}
                        </ol>
                    </div>
                );
        }
        else{
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

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {getAllCheckpoints: getAllCheckpoints},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckpointList);
