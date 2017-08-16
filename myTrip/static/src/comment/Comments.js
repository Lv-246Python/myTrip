import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { CommentNotification } from './CommentNotification';
import { getData, formatDate } from './CommentServices';
import { styles } from './CommentStyles';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            open: false
        };
    }

    notification = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    renderData = () => {
        getData(this.props.tripId)
            .then(response => {
                const comments = response.data;
                this.setState({comments: comments});
            });
    }

    componentDidMount() {
        this.renderData();
    }

    render() {
        return (
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
                                renderData={this.renderData}
                                notification={this.notification}
                                />

                                <CommentNotification
                                    message="Comment deleted"
                                    open={this.state.open}
                                    onRequestClose={this.handleRequestClose} />
                        </ListItem>
                    ))}
                </List>

                <Divider style={styles.divider} />
                <CommentForm tripId={this.props.tripId} renderData={this.renderData} />
            </div>
        );
    }
}
