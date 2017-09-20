import React from 'react';

import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { CommentNotification } from './CommentNotification';
import { getData } from './CommentServices';
import { styles } from './CommentStyles';
import { logged } from '../utils';
import moment from 'moment';

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
        getData(this.props.tripId, this.props.checkpointId, this.props.photoId)
            .then(response => {
                this.setState({comments: response.data});
            });
    }
// reply comment
    handleReply = (name) => {
        this.setState({replyName: name});
    };

    componentDidMount() {
        this.renderData(this.props.tripId, this.props.checkpointId, this.props.photoId);
    }

    render() {
        if (this.state.comments.length === 0) {
            return (
                <div>
                    <h2 style={styles.noComments}>
                        No comments yet
                    </h2>

                    {(logged()) ?
                    <CommentForm
                        tripId={this.props.tripId}
                        photoId={this.props.photoId}
                        checkpointId={this.props.checkpointId}
                        renderData={this.renderData}
                        replyName={this.state.replyName} /> : false}
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
                                    userAvatar={comment.userAvatar}
                                    updated={moment(comment.update_at)
                                             .format('HH:mm, Do MMMM YYYY')}
                                    message={comment.message}
                                    commentId={comment.id}
                                    tripId={this.props.tripId}
                                    checkpointId={this.props.checkpointId}
                                    photoId={this.props.photoId}
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

                    {(logged()) ?
                    <CommentForm
                        tripId={this.props.tripId}
                        tripPhotoId={this.props.tripPhotoId}
                        photoId={this.props.photoId}
                        checkpointId={this.props.checkpointId}
                        checkpointPhotoId={this.props.checkpointPhotoId}
                        renderData={this.renderData}
                        replyName={this.state.replyName} /> : false}
                </div>
            );
        }
    }
}
