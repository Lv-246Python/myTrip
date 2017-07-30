import React from 'react';

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
            comment_message: ''
        };
    }

    handleTouchTap = () => {
        this.setState({open: true});
    };

    handleActionTouchTap = () => {
        this.setState({open: false});
        alert('Comment removed');
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleComment = (event) => {
        const value = event.target.value;
        this.setState({comment_message: value});
    };

    render() {
        return (
          <div>
              <Paper style={styles.paper}>
                  <TextField
                  fullWidth={true}
                  multiLine={true}
                  floatingLabelText="Write a comment"
                  value={this.state.comment_message}
                  onChange={this.handleComment}
                  />
                  <br />

                  <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Add"
                  />

                  <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="undo"
                    autoHideDuration={this.state.autoHideDuration}
                    onActionTouchTap={this.handleActionTouchTap}
                    onRequestClose={this.handleRequestClose}
                  />
              </Paper>
          </div>
    );
  }
}
