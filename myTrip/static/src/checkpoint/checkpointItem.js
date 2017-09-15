import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {checkpointDetails, deleteUpadateList} from './actions/index.js'

class CheckpointItem extends React.Component {
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
                <MenuItem
                    className='checkpoint'
                    primaryText={this.props.checkpoint.position_number + '. ' + this.props.checkpoint.title }
                    onTouchTap={() => this.props.checkpointDetails(this.props.checkpoint)}
                    style={{maxWidth: 300}}/>
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

export default connect(null, matchDispatchToProps)(CheckpointItem);
