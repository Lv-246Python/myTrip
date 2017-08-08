import React from 'react';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  paper: {
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      padding: 10
  },

};

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoHideDuration: 3000,
            message: 'Comment added',
            open: false,
            comment_text: ''
        };
    }

    handleTouchTap = (event) => {
        this.setState({open: true});
        const message = this.state.comment_text;
        axios.post('api/v1/trip/1/comment/', {
            message
        })
            .then(() => {
                 this.props.getData();
                 this.setState({comment_text: ''});
            });
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleComment = (event) => {
        this.setState({'comment_text': event.target.value});
    };

    render() {
        return (
          <div>
              <Paper style={styles.paper}>
                  <TextField
                  fullWidth={true}
                  floatingLabelText="Write a comment"
                  value={this.state.comment_text}
                  onChange={this.handleComment} />
                  <br />

                  <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Add" />

                  <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={this.state.autoHideDuration}
                    onActionTouchTap={this.handleActionTouchTap}
                    onRequestClose={this.handleRequestClose} />
              </Paper>
          </div>
    );
  }
}
