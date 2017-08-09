import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {closeDetails} from './actions/index.js'

import {store} from './testing-page-for-checkpoints.js'
class CheckpoinDetails extends React.Component {

    render(){
        if(this.props.active != null){
            var  self = this;
            return(
                <div>
                    <span className='info'><strong>Checkpoint: {this.props.active.id}; 
                        Title - {this.props.active.title}; 
                        Description - {this.props.active.description};</strong>
                    </span>
                    <span onClick={() => this.props.closeDetails()} className="glyphicon glyphicon-remove">Close</span>
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
        active: state.activeCheckpoint
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {closeDetails: closeDetails},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckpoinDetails);