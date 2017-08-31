import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {checkpointDetails, deleteUpadateList} from './actions/index.js'

class CheckpoinItem extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete (event) {
        this.props.deleteCheckpoint(this.props.list.id,this.props.tripId)
    }

    render() {
        return (
            <div>
                <li>
                    <button className='checkpoint' onClick={() => this.props.checkpointDetails(this.props.checkpoint)}>
                        {this.props.checkpoint.title}
                    </button>
                    <span onClick={() => this.props.deleteUpadateList(this.props.checkpoint.id,this.props.tripId)}
                        className="glyphicon glyphicon-remove">
                    </span>
                </li>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {checkpointDetails: checkpointDetails,
        deleteUpadateList:deleteUpadateList},
        dispatch);
}

export default connect(null, matchDispatchToProps)(CheckpoinItem);
