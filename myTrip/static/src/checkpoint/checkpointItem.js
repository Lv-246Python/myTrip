import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {checkpointDetails, deleteUpadateList} from './actions/index.js'
import {userId} from '../utils'

class CheckpointItem extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete (event) {
        this.props.deleteCheckpoint(this.props.list.id,this.props.trip.id)
    }

    render() {
        let ListItm = <ListItem
                        className='checkpoint'
                        primaryText={this.props.checkpoint.position_number+':'+this.props.checkpoint.title}
                        onTouchTap={() => this.props.checkpointDetails(this.props.checkpoint)}
                        style={{maxWidth: 300}}>
                    </ListItem>
        if(userId() === this.props.trip.user){
            ListItm = <ListItem
                        className='checkpoint'
                        primaryText={this.props.checkpoint.position_number+':'+this.props.checkpoint.title}
                        onTouchTap={() => this.props.checkpointDetails(this.props.checkpoint)}
                        rightIconButton={<DeleteIcon onClick={() => this.props.deleteUpadateList(this.props.checkpoint.id,this.props.trip.id)}/>}
                        style={{maxWidth: 300}}>
                    </ListItem>
        }
        return (
            <div>
<<<<<<< .merge_file_emMVpX
<<<<<<< .merge_file_HtTkZg
                <MenuItem
                    className='checkpoint'
                    primaryText={this.props.checkpoint.position_number + '. ' + this.props.checkpoint.title }
                    onTouchTap={() => this.props.checkpointDetails(this.props.checkpoint)}
                    style={{maxWidth: 300}}/>
=======
                {ListItm}
>>>>>>> .merge_file_WZQ9Qg
=======
                {ListItm}
>>>>>>> .merge_file_RtiKR0
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
