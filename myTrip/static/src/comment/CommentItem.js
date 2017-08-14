import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { putData } from './CommentServices';
import { styles } from './CommentStyles';

export class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogEdit: false,
            disabled: true,
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
        if (this.state.editCommentText.length !== 0) {
            this.setState({'disabled': false});
        };
    };

    handleSubmit = () => {
        putData(this.props.tripId, this.props.commentId, this.state.editCommentText)
            .then(() => {
                 this.props.renderData();
                 this.setState({editCommentText: ''});
                 this.setState({dialogEdit: false});
                 this.setState({'disabled': true});
            });
    };

    handleDelete = () => {
        this.props.deleteComment(this.props.tripId, this.props.commentId)
            .then(() => this.props.renderData());
    };

    render() {
        const actionsEdit = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCloseEditDialog}
          />,

          <FlatButton
            label="Submit"
            disabled={this.state.disabled}
            onTouchTap={this.handleSubmit}
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
                          <Avatar src="/static/src/img/avatar.jpg" size={40} style={styles.avatar} />
                          {this.props.message}
                      </CardText>

                      <CardActions
                          expandable={true}>
                        <FlatButton
                            onTouchTap={this.handleOpenEditDialog}
                            label="Edit" />
                        <FlatButton
                            onTouchTap={this.handleDelete}
                            label="Delete"
                            secondary={true} />
                      </CardActions>

                      <Dialog
                        title="Edit comment"
                        actions={actionsEdit}
                        modal={true}
                        open={this.state.dialogEdit}>

                            <TextField
                            autoFocus
                            fullWidth={true}
                            floatingLabelText="Write a new comment"
                            value={this.state.editCommentText}
                            onChange={this.handleEditCommentText} />
                      </Dialog>
                  </Card>
              </div>
            );
      }
    }
