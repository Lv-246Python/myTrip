import React from 'react';

import Paper from 'material-ui/Paper';
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
            snackbarOpen: false,
            replyName: ''
        };
    }

// snackbar notification
    notification = () => {
        this.setState({snackbarOpen: true});
    };

    handleRequestClose = () => {
        this.setState({snackbarOpen: false});
    };

// refresh page content
    renderData = () => {
        getData(this.props.tripId, this.props.tripPhotoId,
                this.props.checkpointId, this.props.checkpointPhotoId)
            .then(response => {
                this.setState({comments: response.data});
            });
    }
// reply comment
    handleReply = (name) => {
        this.setState({replyName: name});
    };

    componentDidMount() {
        this.renderData();
    }

    render() {
        if (this.state.comments.length === 0) {
            return (
                <div>
                    <h2 style={styles.noComments}>
                        No comments yet
                    </h2>

                    <CommentForm
                        tripId={this.props.tripId}
                        tripPhotoId={this.props.tripPhotoId}
                        checkpointId={this.props.checkpointId}
                        checkpointPhotoId={this.props.checkpointPhotoId}
                        renderData={this.renderData}
                        replyName={this.state.replyName} />
                </div>
            );
        } else {
            return (
                <div>
                    <List>
                        {this.state.comments.map(comment => (
                            <ListItem key={comment.id}>
                                <CommentItem
                                    userName={comment.user_name}
                                    userId={comment.user}
                                    updated={formatDate(comment.update_at)}
                                    message={comment.message}
                                    commentId={comment.id}
                                    tripId={this.props.tripId}
                                    tripPhotoId={this.props.tripPhotoId}
                                    checkpointId={this.props.checkpointId}
                                    checkpointPhotoId={this.props.checkpointPhotoId}
                                    renderData={this.renderData}
                                    notification={this.notification}
                                    handleReply={this.handleReply}/>

                                    <CommentNotification
                                        message="Comment deleted"
                                        open={this.state.snackbarOpen}
                                        onRequestClose={this.handleRequestClose} />
                            </ListItem>
                        ))}
                    </List>

                    <CommentForm
                        tripId={this.props.tripId}
                        tripPhotoId={this.props.tripPhotoId}
                        checkpointId={this.props.checkpointId}
                        checkpointPhotoId={this.props.checkpointPhotoId}
                        renderData={this.renderData}
                        replyName={this.state.replyName} />
                </div>
            );
        }
    }
}
