import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {closeDetails, updateCheckpointUpdateList, deleteUpadateList} from './actions/index.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
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
            title:'',
            description:''
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

    render(){
        if(this.props.active != null){
            var  self = this;
            return(
                
                <div>{/*
                    <span className='info'><strong>Title: </strong></span>
                    <input type="text" name="title" value={this.state.title} onChange={this.updateState}/>
                    <span className='info'><strong>Description: </strong></span>
                    <input type="text" name="description" value={this.state.description} onChange={this.updateState}/>
                    <button onClick={this.updatePoint}>Update</button>
                    <span onClick={() => this.props.closeDetails()} className="glyphicon glyphicon-remove">Close</span>
                </div>*/}
                <div className='checkpointCard'>
                        <div className='checkpointDetails'>
                            <div className='checkpointTextDetails'>
                                <TextField
                                    floatingLabelText="Title:"
                                    value={this.state.title}
                                    hintText="Edit title"
                                    name='title'
                                    underlineShow={false}
                                    fullWidth={true}
                                    onChange={this.updateState}/>

                                <TextField
                                    floatingLabelText="Description:"
                                    hintText="Edit description"
                                    value={this.state.description}
                                    name='description'
                                    underlineShow={false}
                                    fullWidth={true}
                                    multiLine={true}
                                    rowsMax={4}
                                    onChange={this.updateState}/>
                            </div>

                            <CardActions>
                                <div className='checkpointButtons'>

                                    <div className='button'>
                                        <FlatButton
                                            onTouchTap={this.updatePoint}
                                            label="Save"
                                            primary={true}
                                        />
                                    </div>

                                    <div className='button'>
                                        <FlatButton
                                            label='Close'
                                            labelPosition='before'
                                            icon={<CancelIcon />}
                                            primary={true}
                                            onTouchTap={() => this.props.closeDetails()}
                                        />
                                    </div>
                                    <div className='button'>
                                        <FlatButton
                                            label='Delete'
                                            labelPosition='before'
                                            icon={<DeleteIcon />}
                                            disabled={this.state.disabled}
                                            onTouchTap={() => this.props.deleteUpadateList(this.props.active.id, this.props.trip.id)}
                                        />
                                    </div>
                                </div>
                            </CardActions>
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
