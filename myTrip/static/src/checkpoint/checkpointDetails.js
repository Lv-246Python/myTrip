import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {closeDetails, updateCheckpointUpdateList, deleteUpadateList} from './actions/index.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import CancelIcon from 'material-ui/svg-icons/content/clear';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Like from '../like/like';
import PhotosToCheckpoint from './photos_to_checkpoint';
import RaisedButton from 'material-ui/RaisedButton'
import SubmitIcon from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import { userId } from '../utils';
import './main.less';


// import {store} from './testing-page-for-checkpoints.js'
class CheckpointDetails extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
            open: false,
            title:'',
            description:'',
            author: this.props.trip.user,
            checkpointId: null,
            userId: userId,
        }
   };

    componentWillReceiveProps(nextProps) {
        if (nextProps.active != null) {
            this.setState({
                title: nextProps.active.title,
                description: nextProps.active.description,
                checkpointId: nextProps.active.id,
            });
        }
    }      

    updateState = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    updatePoint = () => {
        this.props.updateCheckpointUpdateList(
        this.props.active.longitude,
        this.props.active.latitude,
        this.state.title,
        this.state.description,
        this.props.active.position_number,
        this.props.active.source_url,
        this.props.trip.id,
        this.props.active.id
        )
    }

    handleOpenDeleteCheckpoint = () => {
        this.setState({open: true});
    };


    handleCloseDeleteCheckpoint = () => {
        this.setState({open: false});
    };

    render(){

        if(this.props.active != null){
            var  self = this;

            const actionsDelete = [
                <div className='buttonTripDialog'>
                    <RaisedButton
                        label='Cancel'
                        labelPosition='before'
                        primary={true}
                        onTouchTap={this.handleCloseDeleteCheckpoint}
                    />
                    <RaisedButton
                        label='Delete'
                        labelPosition='before'
                        secondary={true}
                        onTouchTap={() => {this.props.deleteUpadateList(
                                               this.props.active.id, this.props.trip.id
                                           ); this.handleCloseDeleteCheckpoint()}}
                    />
                </div>
            ];

            return(
                <div className='checkpointCard'>
                    <Card>
                        <div className='checkpointDetails'>
                            <div className='checkpointWidth100'>
                                <div className='checkpointTitleAndButtons'>

                                    {(this.state.userId() == this.state.author) ?
                                    <TextField
                                        value={this.state.title}
                                        hintText="Edit title"
                                        name='title'
                                        underlineShow={false}
                                        fullWidth={true}
                                        onChange={this.updateState}/>
                                    :
                                    <TextField
                                        value={this.state.title}
                                        name='title'
                                        underlineShow={false}
                                        fullWidth={true}
                                        readOnly/>
                                    }

                                    <CardActions style={{padding: 0}}>
                                        <div className='checkpointButtons'>

                                            {(this.state.userId() === this.state.author) ?
                                            <div>
                                                <IconButton
                                                    key="Save"
                                                    tooltip='SAVE CHANGES'
                                                    tooltipPosition='top-center'
                                                    onTouchTap={this.updatePoint}
                                                >
                                                    <SubmitIcon />
                                                </IconButton>
                                            </div> : false}

                                            {(this.state.userId() === this.state.author) ?
                                            <div>
                                                <IconButton
                                                    key='Delete'
                                                    tooltip='DELETE CHECKPOINT'
                                                    tooltipPosition='top-center'
                                                    onTouchTap={this.handleOpenDeleteCheckpoint}

                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div> : false}

                                            <div className='likePadding'>
                                                <Like
                                                    tripId={this.props.trip.id}
                                                    checkpointId={this.props.active.id}
                                                />
                                            </div>

                                            <div>
                                                <IconButton
                                                    key='Close'
                                                    tooltip='CLOSE DETAILS'
                                                    tooltipPosition='top-center'
                                                    onTouchTap={() => this.props.closeDetails()}
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                            </div>

                                            <Dialog
                                                title='Do you really want to delete checkpoint?'
                                                actions={actionsDelete}
                                                open={this.state.open}
                                                onRequestClose={this.handleCloseDeleteCheckpoint}
                                            />

                                        </div>
                                    </CardActions>
                                </div>

                                <div className='checkpointDescriptionAndButtons'>
                                    <div className='checkpointDescription'>

                                        {(this.state.userId() == this.state.author) ?
                                        <TextField
                                            hintText="Edit description"
                                            value={this.state.description}
                                            name='description'
                                            underlineShow={false}
                                            fullWidth={true}
                                            multiLine={true}
                                            onChange={this.updateState}/>
                                        :
                                        <TextField
                                            value={this.state.description}
                                            name='description'
                                            underlineShow={false}
                                            fullWidth={true}
                                            multiLine={true}
                                            readOnly/>
                                        }

                                    </div>
                                </div>
                            </div>

                            <CardMedia>
                                <PhotosToCheckpoint
                                    tripAuthor={this.props.trip.user}
                                    tripId={this.props.trip.id}
                                    checkpointId={this.props.active.id}
                                />
                            </CardMedia>
                        </div>
                    </Card>
                </div>
            );
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
        active: state.activeCheckpoint
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {closeDetails: closeDetails,
        updateCheckpointUpdateList:updateCheckpointUpdateList,
        deleteUpadateList:deleteUpadateList},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckpointDetails);
