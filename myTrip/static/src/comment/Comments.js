import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { getData, deleteComment, formatDate } from './CommentServices';
import { styles } from './CommentStyles';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.renderData = this.renderData.bind(this);
        this.state = {
            comments: []
        };
    }

    renderData = () => {
        getData(this.props.tripId)
            .then(response => {
                const comments = response.data;
                this.setState({comments});
            });
    }

    componentDidMount() {
        this.renderData()
    }

    render() {
        return (
            <Paper zDepth={5} rounded={false} style={styles.paper}>
                <div>
                    <List>
                        {this.state.comments.map(comment => (
                            <ListItem key={comment.id}>
                                <CommentItem
                                    username={comment.user_name}
                                    updated={formatDate(comment.update_at)}
                                    message={comment.message}
                                    commentId={comment.id}
                                    tripId={this.props.tripId}
                                    deleteComment={deleteComment}
                                    renderData={this.renderData}
                                    />
                            </ListItem>
                        ))}
                    </List>

                    <Divider style={styles.divider} />
                    <CommentForm tripId={this.props.tripId} renderData={this.renderData} />
                </div>
            </Paper>
        );
    }
}
