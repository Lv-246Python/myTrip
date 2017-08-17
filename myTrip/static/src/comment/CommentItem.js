import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { CommentAvatar } from './CommentAvatar';
import { CommentNotification } from './CommentNotification';
import { EditDialog, DeleteDialog } from './CommentDialogs';
import { putData, deleteComment } from './CommentServices';
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

    handleOpenEditDialog = () => {
      this.setState({dialogEdit: true});
      this.setState({'editCommentText': this.props.message});
    };

    handleCloseEditDialog = () => {
      this.setState({dialogEdit: false});
      this.setState({'disabled': true});
      this.setState({'editCommentText': ''});
    };

    handleEditCommentText = (event) => {
        this.setState({'editCommentText': event.target.value});
        if ((event.target.value === this.props.message) || (event.target.value.length === 0)) {
             this.setState({'disabled': true});
         } else {
             this.setState({'disabled': false});
         }
    };

    handleSubmit = () => {
        putData(this.props.tripId, this.props.commentId, this.state.editCommentText)
            .then(() => {
                 this.props.renderData();
                 this.setState({editCommentText: ''});
                 this.setState({dialogEdit: false});
                 this.setState({'disabled': true});
                 this.setState({snackbarOpen: true});
            });
    };

    handleOpenDeleteDialog = () => {
        this.setState({dialogDelete: true});
    };

    handleCloseDeleteDialog = () => {
        this.setState({dialogDelete: false});
    };

    handleDelete = () => {
        deleteComment(this.props.tripId, this.props.commentId)
            .then(() => {
                this.props.renderData();
                this.props.notification();
            });
    };

    handleRequestClose = () => {
        this.setState({snackbarOpen: false});
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
                          title={this.props.username}
                          subtitle={this.props.updated}
                          expandable={true} />

                      <CardText
                          actAsExpander={true}
                          style={styles.commentText}>
                          <CommentAvatar />
                            {this.props.message}
                      </CardText>

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

                      <CommentNotification
                          message="Comment edited"
                          open={this.state.snackbarOpen}
                          onRequestClose={this.handleRequestClose} />

                      <EditDialog
                        actions={actionsEdit}
                        title="Edit comment"
                        floatingLabelText="Write a new comment"
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
