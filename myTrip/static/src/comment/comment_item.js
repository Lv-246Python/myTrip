import React from 'react';
import axios from 'axios';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ListItem from 'material-ui/List/ListItem';

const styles = {
  avatar: {
      marginRight: 10,
      marginBottom: 10
  },

  commentText: {
      fontSize: 20
  },

};

export class CommentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [{a: '2', b: 4}, {a: 1, b: 3}]
    };
}

componentDidMount() {
  axios.get('api/v1/trip/7/comment/')
    .then(response => {
      const comments = response.data;
      this.setState({comments});
    }
    );
}

render() {
    return (
      <div>
            {this.state.comments.length && this.state.comments.map( comment =>
                (<ListItem>
                <Card>
                    <CardHeader
                        title={comment.user}
                        subtitle={comment.update_at}
                        expandable={true} />

                    <CardText
                        actAsExpander={true}
                        style={styles.commentText}>
                        <Avatar src="static/src/img/avatar.jpg" size={40} style={styles.avatar}/>
                        {comment.message}
                    </CardText>

                    <CardActions
                        expandable={true}>
                      <FlatButton label="Edit" />
                      <FlatButton label="Delete" />
                    </CardActions>
                </Card>
            </ListItem>))}
      </div>
    );
  }
}
