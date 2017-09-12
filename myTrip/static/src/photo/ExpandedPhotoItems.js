import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton'

import { userId } from '../utils';
import { deletePhoto, setForTripPage } from './PhotoServices'

import { PhotoEdit } from './PhotoEdit';
import { TitleItem } from './TitleItem';
import { CommentItem } from './CommentItem';
import { styles } from './PhotoStyles';

export class ExpandedPhotoItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    deletePhoto = () => {
        deletePhoto(this.props.tripId, this.props.photoId)
        .then(this.setState({open: false}));
        this.props.close();
        this.props.removeImage(this.props.photoId);
    }

    setImage = () => {
        setForTripPage(this.props.tripId, this.props.src)
    }


    handleOpenDeletePhoto = () => {
        this.setState({open: true});
    };


    handleCloseDeletePhoto = () => {
        this.setState({open: false});
    };

    render(){
            const actionsDelete = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    label='Cancel'
                    labelPosition='before'
                    primary={true}
                    onTouchTap={this.handleCloseDeletePhoto}
                />
                <RaisedButton
                    label='Delete'
                    labelPosition='before'
                    secondary={true}
                    onTouchTap={this.deletePhoto}
                />
            </div>
        ];

        return (
            <Paper style={styles.overflow}>
                <TitleItem
                    src={this.props.src}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    description={this.props.description}
                    tripId={this.props.tripId}
                    photoId={this.props.photoId}/>

                    {(userId() === this.props.user) ?
                    <FlatButton 
                    label="SET AS TRIP IMAGE"
                    onTouchTap={this.setImage}
                    fullWidth={true}  /> : false }

                    {(userId() === this.props.user) ?
                    <FlatButton 
                    label="DELETE"
                    onTouchTap={this.handleOpenDeletePhoto}
                    fullWidth={true}  /> : false }

                    {(userId() === this.props.user) ?                     
                    <PhotoEdit
                    updatePhotoInfo={this.props.updatePhotoInfo} 
                    title={this.props.title}
                    description={this.props.description}
                    tripId={this.props.tripId}
                    photoId={this.props.photoId} /> : false }

                    <Dialog
                    title='Do you really want to delete photo?'
                    actions={actionsDelete}
                    open={this.state.open}
                    onRequestClose={this.handleCloseDeleteTrip}
                 />

                <CommentItem
                    tripId={this.props.tripId}
                    photoId={this.props.photoId} />
                <footer style={styles.footer}></footer>
            </Paper>
    );
  }
}
