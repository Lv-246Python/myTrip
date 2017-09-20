import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { CardActions } from 'material-ui/Card';
import { logged } from '../utils';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import LikeNoIcon from 'material-ui/svg-icons/action/favorite-border';
import LikeYesIcon from 'material-ui/svg-icons/action/favorite';
import LoadProgress from '../load_progress';
import Popover from 'material-ui/Popover';
import './like.less';

const style = {
    likeAvatars: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 16,
        paddingBottom: 16,
    },
    notLogged: {
        margin: 12,
    }
}


export default class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last5: null,
            likeCount: null,
            liked: false,
            open: false,
            checkpointId: this.props.checkpointId,
        }
    }

    /*
    function that generates the request url depending on the props
    examples of props: tripId, checkpointId, photoId, commentId
    */
    getLikeUrl = () => {
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
        return axios.get(this.getLikeUrl()).then(response => {
            const last5 = response.data.last_5_users;
            const likeCount = response.data.count;
            const liked = response.data.liked;
            this.setState({
                last5: last5,
                likeCount: likeCount,
                liked: liked,
            });
        })
    }

    postLike = () => {
        return axios.post((this.getLikeUrl()), {}).then(() => {
            this.getLikes()
        })
    }

    componentDidMount() {
        this.getLikes();
    }

    handleOpen = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };


    render(){

        let last5Likes = (
            <div>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'center'}}
                >
                    <div onMouseLeave={this.handleClose}>
                        <div className='last5Title'>
                            The last 5 users liked
                        </div>
                        <CardActions style={style.likeAvatars}>

                            {(this.state.last5) ?
                            this.state.last5.map((likes) => (
                                <div key={likes.user_id}>
                                    <IconButton
                                        containerElement={
                                            <Link to={`/profile/${likes.user_id}`} />
                                        }
                                        tooltip={likes.user_name}
                                        tooltipPosition='top-center'
                                    >
                                        <Avatar src={likes.avatar} />
                                    </IconButton>
                                </div>
                            )) : false}
                        </CardActions>
                    </div>
                </Popover>
            </div>
        )

        if (!logged()){
            return(
                <div className='likes'>
                    <div className='likeCount' onMouseOver={this.handleOpen}>
                        {this.state.likeCount}
                    </div>
                    <LikeNoIcon style={style.notLogged} />
                    {last5Likes}
                </div>
            )
        } else {
            return(
                <div className='likes'>
                    <div className='likeCount' onMouseOver={this.handleOpen}>
                        {this.state.likeCount}
                    </div>
                    <IconButton onClick={this.postLike}>
                        {(!this.state.liked) ? <LikeNoIcon/> : <LikeYesIcon color='#FF4081'/>}
                    </IconButton>
                    {last5Likes}
                </div>
            )
        }
    }
}
