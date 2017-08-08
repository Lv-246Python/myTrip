import React from 'react';
import axios from 'axios';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  avatar: {
      marginRight: 10,
      marginBottom: 0
  },

  commentText: {
      fontSize: 20,
      lineHeight: "150%"
  },

};

export class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false,
            openDelete: false,
            disabledEdit: true,
            edit_comment_text: ''
        };
    }

    handleOpenEdit = () => {
      this.setState({openEdit: true});
    };

    handleOpenDelete = () => {
      this.setState({openDelete: true});
    };

    handleCloseEdit = () => {
      this.setState({openEdit: false});
      this.setState({'disabledEdit': true});
      this.setState({'edit_comment_text': ''});
    };

    handleCloseDelete = () => {
      this.setState({openDelete: false});
    };

    handleEdit = (event) => {
        this.setState({'edit_comment_text': event.target.value});
        if (this.state.edit_comment_text.length !== 0) {
            this.setState({'disabledEdit': false});
        };
    };

    handleSubmit = () => {
        const message = this.state.edit_comment_text;
        axios.put('api/v1/trip/2/comment/' + this.props.commentId + '/', {
            message
        })
            .then(() => {
                 this.props.getData();
                 this.setState({edit_comment_text: ''});
                 this.setState({openEdit: false});
                 this.setState({'disabledEdit': true});
            });
    };

    handleDelete = () => {
        this.props.deleteComment(this.props.commentId);
    };

    render() {
        const actionsEdit = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCloseEdit}
          />,
          <FlatButton
            label="Submit"
            disabled={this.state.disabledEdit}
            onTouchTap={this.handleSubmit}
          />,
        ];

        const actionsDelete = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCloseDelete}
          />,
          <FlatButton
            label="Delete"
            disabled={this.state.disabledDelete}
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
                          <Avatar src="static/src/img/avatar.jpg" size={40} style={styles.avatar} />
                          {this.props.message}
                      </CardText>

                      <CardActions
                          expandable={true}>
                        <FlatButton
                            onTouchTap={this.handleOpenEdit}
                            label="Edit" />
                        <FlatButton
                            onTouchTap={this.handleOpenDelete}
                            label="Delete"
                            secondary={true} />
                      </CardActions>

                      <Dialog
                        title="Edit comment"
                        actions={actionsEdit}
                        modal={true}
                        open={this.state.openEdit}>

                            <TextField
                            fullWidth={true}
                            floatingLabelText="Write a new comment"
                            value={this.state.edit_comment_text}
                            onChange={this.handleEdit} />
                      </Dialog>

                      <Dialog
                        title="Delete comment"
                        actions={actionsDelete}
                        modal={true}
                        open={this.state.openDelete} />
                  </Card>
              </div>
            );
      }
    }
