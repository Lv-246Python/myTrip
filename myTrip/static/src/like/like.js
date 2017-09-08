import React from 'react';
import axios from "axios";

import {List, ListItem} from 'material-ui/List';
import { logged } from '../utils';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import LikeNoIcon from 'material-ui/svg-icons/action/favorite-border';
import LikeYesIcon from 'material-ui/svg-icons/action/favorite';
import './like.less';


export default class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likeCount: null,
            liked: false,
        }
    }

    likeUrl = () => {
        let url = '/api/v1/trip/'+ this.props.tripId + '/';
        if (this.props.checkpointId) {
            url += 'checkpoint/' + this.props.checkpointId + '/';
            if (this.props.photoId) {
                url += 'photo/' + this.props.photoId + '/';
                if (this.props.commentId) {
                    url += 'comment/' + this.props.commentId + '/';
                }
            } else {
                if (this.props.commentId) {
                    url += 'comment/' + this.props.commentId + '/';
                }
            }
        } else {
            if (this.props.photoId) {
                url += 'photo/' + this.props.photoId + '/';
                if (this.props.commentId) {
                    url += 'comment/' + this.props.commentId + '/';
                }
            } else {
                if (this.props.commentId) {
                    url += 'comment/' + this.props.commentId + '/';
                }
            }
        }
        return url + 'like/';
    }

    getLikes = () => {
        return axios.get(this.likeUrl()).then(response => {
            const likeCount = response.data.count;
            const liked = response.data.liked;
            this.setState({
                likeCount: likeCount,
                liked: liked,
            });
        })
    }

    postLike = () => {
        return axios.post((this.likeUrl()), {}).then(() => {
            this.getLikes()
        })
    }

    componentDidMount() {
        this.getLikes();
    }


    render(){

        if (!logged()){
            return(
                <div className='likes'>
                    <div className='likeCount'>
                        {this.state.likeCount}
                    </div>
                    <IconButton
                        disableTouchRipple={true}
                    >
                        <LikeNoIcon />
                    </IconButton>
                </div>
            )
        } else if (!this.state.liked) {
            return(
                <div className='likes'>
                    <div className='likeCount'>
                        {this.state.likeCount}
                    </div>
                    <IconButton
                        onClick={this.postLike}
                    >
                        <LikeNoIcon />
                    </IconButton>
                </div>
            )
        } else {
            return(
                <div className='likes'>
                    <div className='likeCount'>
                        {this.state.likeCount}
                    </div>
                    <IconButton
                        onClick={this.postLike}
                    >
                        <LikeYesIcon color='#FF4081' />
                    </IconButton>
                </div>
            )
        };
    }
}
