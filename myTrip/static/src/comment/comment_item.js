import React from 'react';
import axios from 'axios';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

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
    handleDelete = () => {
        axios.delete('api/v1/trip/2/comment/9/')
    };

    render() {
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
                        onTouchTap={this.handleEdit}
                        label="Edit" />
                    <FlatButton
                        onTouchTap={this.handleDelete}
                        label="Delete" />
                  </CardActions>
              </Card>
          </div>
        );
      }
    }
