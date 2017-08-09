import React from 'react';
import moment from 'moment';

import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import './trip.less'

/*
import Map from 'map';
import Photo from 'photo'
import Like from 'like';
*/


export default class TripItem extends React.Component {
    constructor(props){
        super(props);
        this.state = props.trip;
    };

    render(){
        return (
        <div>
            <Card>

                <Card>
                    <CardHeader
                    title={<h3>{this.state.title}</h3>}
                    subtitle={moment(this.state.create_at).format('MMMM Do, h:mm a')}
                    />
                </Card>

                {/*
                there will be Google Map component
                */}

                <CardMedia>
                    <img src="/static/src/img/world_map.jpg" />
                </CardMedia>

                {/*
                there will be <Photo /> component
                */}

                <CardMedia>
                    <h3>Trip Photo Gallery</h3>
                </CardMedia>

                <CardText className='description'>
                    <h3>Description</h3>
                    {this.state.description}
                </CardText>

                {/*
                there will be <Like /> component
                */}

                <div className='likeIcon'>
                <CardActions>
                    <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />} />
                </CardActions>
                </div>

            </Card>

        </div>
        );
    }
}
