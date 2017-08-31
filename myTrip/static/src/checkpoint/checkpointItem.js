import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
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
                <div className='checkpoinItem'>
                    <ListItem
                        className='checkpoint'
                        primaryText={this.props.checkpoint.title}
                        onClick={() => this.props.checkpointDetails(this.props.checkpoint)}
                        style={{maxWidth: 200}}
                    />
                    <IconButton 
                        onTouchTap={() => this.props.deleteUpadateList(this.props.checkpoint.id,this.props.tripId)} 
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>


                    <Divider />

            </div>
        );
    }
}

//{() => this.props.deleteUpadateList(this.props.checkpoint.id,this.props.tripId)}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {checkpointDetails: checkpointDetails,
        deleteUpadateList:deleteUpadateList},
        dispatch);
}

export default connect(null, matchDispatchToProps)(CheckpoinItem);
