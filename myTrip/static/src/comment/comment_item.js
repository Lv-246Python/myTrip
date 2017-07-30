import React from 'react';

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
    render() {
        return (
            <ListItem>
                <Card>
                    <CardHeader
                        title="Roman Hrytskiv"
                        subtitle="29/07/2017"
                        expandable={true} />

                    <CardText
                        actAsExpander={true}
                        style={styles.commentText}>
                        <UserAvatar />
                        Nice views man!
                        <br />
                        I wish I could go there with you but i have to code. See you in a month!
                    </CardText>

                    <CardActions
                        expandable={true}>
                      <FlatButton label="Edit" />
                      <FlatButton label="Delete" />
                    </CardActions>

                </Card>
            </ListItem>
        );
    }
}

class UserAvatar extends React.Component {
    render() {
        return (<Avatar src="static/src/img/avatar.jpg" size={40} style={styles.avatar}/>);
    }
}
