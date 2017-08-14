import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { postData } from './CommentServices';
import { styles } from './CommentStyles';

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
        };
    }

    handleTouchTap = (event) => {
        postData(this.props.tripId, this.state.commentText)
            .then(() => {
                 this.props.renderData();
                 this.setState({commentText: ''});
            });
    };

    handleComment = (event) => {
        this.setState({'commentText': event.target.value});
    };

    render() {
        return (
          <div>

                  <TextField
                  fullWidth={true}
                  floatingLabelText="Write a comment"
                  value={this.state.commentText}
                  onChange={this.handleComment} />
                  <br />

                  <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Add" />

          </div>
    );
  }
}
