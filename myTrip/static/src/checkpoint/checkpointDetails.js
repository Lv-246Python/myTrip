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
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import { userId } from '../utils';
import './main.less';


import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import SubmitIcon from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';

let images = [
    {img: '/static/src/img/1_page.jpg'},
    {img: '/static/src/img/nice_pic.jpg'},
    {img: '/static/src/img/nice_pic_finished.jpg'},
    {img: '/static/src/img/nice_pic_progr.jpg'},
]

const styles = {
    gridList: {
        width: 200,
        height: 200,
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
            userId: this.props.trip.user
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

       const buildTextField = () => {
          if (userId() == this.props.trip.user) {
              return (<TextField
                      floatingLabelText="Title:"
                      value={this.state.title}
                      hintText="Edit title"
                      name='title'
                      underlineShow={false}
                      fullWidth={true}
                      onChange={this.updateState}/>);
          } else {
              return (<TextField
                      floatingLabelText="Title:"
                      value={this.state.title}
                      hintText="Edit title"
                      name='title'
                      underlineShow={false}
                      fullWidth={true}
                      readOnly/>);
          }
       }

            return(
                <div className='checkpointCard'>
                    <Card>
                        <div className='checkpointDetails'>
                            <div className='checkpointTitleAndButtons'>

                                {buildTextField()}

                                <CardActions>
                                    <div className='checkpointButtons'>

                                        {(userId() === this.state.userId) ?
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

                                        {(userId() === this.state.userId) ?
                                        <div>
                                            <IconButton
                                                key="Photo"
                                                tooltip='ADD A PHOTO'
                                                tooltipPosition='top-center'
                                            >
                                                <AddPhotoIcon />
                                            </IconButton>
                                        </div> : false}

                                        {(userId() === this.state.userId) ?
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

                            <div className='checkpointDescriptionAndPhotos'>
                                <div className='checkpointDescription'>
                                    <TextField
                                        floatingLabelText="Description:"
                                        hintText="Edit description"
                                        value={this.state.description}
                                        name='description'
                                        underlineShow={false}
                                        fullWidth={true}
                                        multiLine={true}
                                        rowsMax={6}
                                        onChange={this.updateState}/>
                                </div>

                                <div className='gridList'>
                                    <GridList
                                        cellHeight={180}
                                        cols={2}
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
                        </div>
                    </Card>
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
        {closeDetails: closeDetails,
        updateCheckpointUpdateList:updateCheckpointUpdateList,
        deleteUpadateList:deleteUpadateList},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckpointDetails);
