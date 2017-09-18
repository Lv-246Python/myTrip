import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {closeDetails, updateCheckpointUpdateList, deleteUpadateList} from './actions/index.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import EditIcon from 'material-ui/svg-icons/image/edit';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Like from '../like/like';
import RaisedButton from 'material-ui/RaisedButton'
import SubmitIcon from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import { userId } from '../utils';
import './main.less';


let images = [
    {img: '/static/src/img/1_page.jpg'},
    {img: '/static/src/img/nice_pic.jpg'},
    {img: '/static/src/img/nice_pic_finished.jpg'},
    {img: '/static/src/img/nice_pic_progr.jpg'},
]

const styles = {
    gridList: {
        width: 200,
        height: 185,
        overflowY: 'auto',
    },
};
// import {store} from './testing-page-for-checkpoints.js'
class CheckpointDetails extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
            open: false,
            title:'',
            description:'',
            author: this.props.trip.user,
            userId: userId
        }
      // this.updateState = this.updateState.bind(this);

   };
    componentWillReceiveProps(nextProps) {
        if (nextProps.active != null) {
            this.setState({ title: nextProps.active.title,
                            description:nextProps.active.description});
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
                                                );this.handleCloseDeleteCheckpoint()}}
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
                                        rowsMax={4}
                                        onChange={this.updateState}/>
                                    :
                                    <TextField
                                        value={this.state.description}
                                        name='description'
                                        underlineShow={false}
                                        fullWidth={true}
                                        multiLine={true}
                                        rowsMax={4}
                                        readOnly/>
                                    }

                                </div>

                                {(this.state.userId() === this.state.author) ?
                                <CardActions style={{padding: 0}}>
                                    <div className='photoIcon'>
                                        <IconButton
                                            key="Photo"
                                            tooltip='ADD A PHOTO'
                                            tooltipPosition='top-center'
                                        >
                                            <AddPhotoIcon />
                                        </IconButton>
                                    </div>
                                 </CardActions> : false}
                            </div>

                            <div className='likePadding'>
                                <Like
                                    tripId={this.props.trip.id}
                                    checkpointId={this.props.active.id}
                                />
                            </div>
                        </div>

                        <div className='gridList'>
                            <GridList
                                cellHeight={180}
                                cols={1}
                                style={styles.gridList}
                            >
                                {images.map((tile) => (
                                    <GridTile key={tile.img} >
                                        <img src={tile.img} />
                                    </GridTile>
                                ))}
                            </GridList>
                        </div>

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
