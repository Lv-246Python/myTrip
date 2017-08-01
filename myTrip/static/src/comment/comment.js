import React from 'react';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { CommentItem } from './comment_item';
import { CommentForm } from './comment_form';

var moment = require('moment');

const styles = {
    paper: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,

        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },

    divider: {
        backgroundColor: 'grey'
    }

};

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        axios.get('api/v1/trip/2/comment/').then(response => {
            const comments = response.data;
            this.setState({comments});
        });
    }

    render() {
        return (
            <Paper zDepth={5} rounded={false} style={styles.paper}>
                <div>
                    <List>
                        {this.state.comments.length && this.state.comments.map(comment => (
                            <ListItem key={comment.id}>
                                <CommentItem
                                    username={comment.user_name}
                                    updated={moment(comment.update_at).format('MMMM Do, h:mm a')}
                                    message={comment.message} />
                            </ListItem>
                        ))}
                    </List>

                    <Divider style={styles.divider}/>
                    <CommentForm/>
                </div>
            </Paper>
        );
    }
}
