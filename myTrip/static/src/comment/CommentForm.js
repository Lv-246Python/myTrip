import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { CommentNotification } from './CommentNotification';
import { postData } from './CommentServices';
import { styles } from './CommentStyles';
import { userId } from '../utils';

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCommentText: '',
            disabled: true,
            snackbarOpen: false,
        };
    }

// snackbar notification
    handleRequestClose = () => {
        this.setState({snackbarOpen: false});
    };

// add comment
    handleComment = (event) => {
        this.setState({'newCommentText': event.target.value});
        if (event.target.value.length > 0) {
             this.setState({disabled: false});
         } else {
             this.setState({disabled: true});
         }

    };

    handleTouchTap = () => {
        postData(this.props.tripId, this.state.newCommentText)
            .then(() => {
                 this.props.renderData();
                 this.setState({newCommentText: ''});
                 this.setState({disabled: true});
                 this.setState({snackbarOpen: true});
            });
    };

    render() {
        return (
          <div>
              <Paper style={styles.paperForm}>
                  <TextField
                  fullWidth={true}
                  floatingLabelText="Write a comment"
                  value={this.state.newCommentText}
                  onChange={this.handleComment} />

                  <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    primary={true}
                    disabled={this.state.disabled}
                    label="Add" />

                <CommentNotification
                    open={this.state.snackbarOpen}
                    message={'Comment added'}
                    onRequestClose={this.handleRequestClose} />
              </Paper>
          </div>
    );
  }
}
