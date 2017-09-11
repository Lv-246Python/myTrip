import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Like from '../like/like';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { CommentAvatar } from './CommentAvatar';
import { CommentNotification } from './CommentNotification';
import { EditDialog, DeleteDialog } from './CommentDialogs';
import { putData, deleteComment } from './CommentServices';
import { userId, logged } from '../utils';
import { styles } from './CommentStyles';

export class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogEdit: false,
            dialogDelete: false,
            disabled: true,
            snackbarOpen: false,
            editCommentText: ''
        };
    }

// snackbar notification
    handleRequestClose = () => {
        this.setState({snackbarOpen: false});
    };

// edit comment
    handleOpenEditDialog = () => {
      this.setState({dialogEdit: true});
      this.setState({'editCommentText': this.props.message});
    };

    handleEditCommentText = (event) => {
        this.setState({'editCommentText': event.target.value});
        if ((event.target.value !== this.props.message) &&
            (event.target.value.trim().length !== 0)) {
             this.setState({'disabled': false});
         } else {
             this.setState({'disabled': true});
         }
    };

    handleSubmit = () => {
        putData(this.props.tripId, this.props.tripPhotoId,
                this.props.checkpointId, this.props.checkpointPhotoId,
                this.props.commentId, this.state.editCommentText)
            .then(() => {
                 this.props.renderData();
                 this.setState({editCommentText: ''});
                 this.setState({dialogEdit: false});
                 this.setState({'disabled': true});
                 this.setState({snackbarOpen: true});
            });
    };

    handleCloseEditDialog = () => {
      this.setState({dialogEdit: false});
      this.setState({'disabled': true});
      this.setState({'editCommentText': ''});
    };

// delete comment
    handleOpenDeleteDialog = () => {
        this.setState({dialogDelete: true});
    };

    handleDelete = () => {
        deleteComment(this.props.tripId, this.props.tripPhotoId,
                      this.props.checkpointId, this.props.checkpointPhotoId,
                      this.props.commentId)
            .then(() => {
                this.props.renderData();
                this.props.notification();
            });
    };

    handleCloseDeleteDialog = () => {
        this.setState({dialogDelete: false});
    };

// reply comment
    handleReply = () => {
        let replyName = '@' + (this.props.userName.split(' ').join('_')).toLowerCase() + ' ';
        this.props.handleReply(replyName);
    };

    render() {
        const actionsEdit = [
            <FlatButton
            label="Cancel"
            disableTouchRipple={true}
            onTouchTap={this.handleCloseEditDialog}
            />,

            <RaisedButton
            label="Submit"
            primary={true}
            disabled={this.state.disabled}
            onTouchTap={this.handleSubmit}
            />,
        ];

        const actionsDelete = [
            <FlatButton
            label="Cancel"
            disableTouchRipple={true}
            onTouchTap={this.handleCloseDeleteDialog}
            />,

            <RaisedButton
            label="Delete"
            secondary={true}
            onTouchTap={this.handleDelete}
            />,
        ];

        return (
              <div>
                  <Card>
                      <CardHeader
                          avatar={<CommentAvatar />}
                          title={this.props.userName}
                          subtitle={this.props.updated}
                          expandable={true} />

                      <CardText
                          actAsExpander={true}
                          style={styles.commentText}>
                          <CommentAvatar userAvatar={this.props.userAvatar}/>
                            {this.props.message}
                          style={styles.commentText}
                      >
                          <TextField
                              id={(this.props.commentId).toString()}
                              underlineShow={false}
                              multiLine={true}
                              fullWidth={true}
                              value={this.props.message}
                          />
                      </CardText>
                      <CardActions>
                        <Like
                            tripId={this.props.tripId}
                            checkpointId={this.props.checkpointId}
                            photoId={this.props.photoId}
                            commentId={this.props.commentId}
                        />
                      </CardActions>

                      {(logged()) ?
                          (this.props.userId === userId()) ?
                              <CardActions
                                  expandable={true}>
                                <FlatButton
                                    label="Edit"
                                    disableTouchRipple={true}
                                    onTouchTap={this.handleOpenEditDialog} />
                                <FlatButton
                                    label="Delete"
                                    secondary={true}
                                    onTouchTap={this.handleOpenDeleteDialog} />
                              </CardActions>
                              :
                              <CardActions
                                  expandable={true}>
                                <FlatButton
                                    label="Reply"
                                    onTouchTap={this.handleReply} />
                              </CardActions>

                       :false}

                      <CommentNotification
                          message="Comment edited"
                          open={this.state.snackbarOpen}
                          onRequestClose={this.handleRequestClose} />

                      <EditDialog
                        actions={actionsEdit}
                        title="Edit comment"
                        open={this.state.dialogEdit}
                        value={this.state.editCommentText}
                        onChange={this.handleEditCommentText} />

                      <DeleteDialog
                        actions={actionsDelete}
                        title="Delete comment"
                        open={this.state.dialogDelete} />
                  </Card>
              </div>
            );
        }
    }
