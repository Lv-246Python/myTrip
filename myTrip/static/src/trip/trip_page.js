import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import { getTrip, formatDate } from './trip_service';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import SubHeader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import TripDescription from './trip_description'
import TripHeader from './trip_header'
import TripNavigation from './trip_navigation'
import TripMenu from './trip_menu'
import './trip.less'
import Comments from "../comment/Comments";
/*
import Checkpoint from 'checkpoint';
import Comment from 'comment';
import Like from 'like';
import Photo from 'photo'
*/


export default class TripPage extends React.Component {
    constructor(props){
        super(props);
        //get trip id from page id
        this.tripId = this.props.match.params.id;
        this.state = {
            trip: null,
        };
    };


    //get trip data from backend by url with trip id
    getTrip = () => {
        axios.get(`/api/v1/trip/${this.tripId}/`).then(response => {
            const trip = response.data;
            this.setState({trip: trip});
        });
    };

    //add trip data to state and rerender page
    componentDidMount() {
        this.getTrip();
    };

    render() {

        const trip = this.state.trip;

        return (
        <div className="HolyGrail">
            <div className="HolyGrail-body">
                <main className="HolyGrail-content">
                    <Card>

                    {/*
                    render other part of page while trip=null, after componentDidMount,
                    rerender page with trip data
                    */}

                    {trip &&

                    <div>
                        <Card>
                            <Card>
                                <CardHeader className='tripPageHeader'
                                    title={<h3>{trip.title}</h3>}
                                    subtitle={formatDate(trip.create_at)}
                                    >

                                    {/*

                                    {trip && <TripHeader
                                        trip={this.state.trip} />}

                                    {trip && <SubHeader>
                                        {formatDate(trip.create_at)}
                                    </SubHeader>}

                                    */}

                                </CardHeader>
                            </Card>

                            {/*
                            there will be Google Map component
                            */}

                            <CardMedia className='tripGoogleMap'>
                                <img src="/static/src/img/world_map.jpg" />
                            </CardMedia>

                            {/*
                            there will be <Photo /> component
                            */}

                            <CardMedia className='tripPhotoGallery'>
                                <h3>Trip Photo Gallery</h3>
                            </CardMedia>

                            <CardText className='tripDescription'>
                                <h3>Description</h3>

                                {/*

                                {trip && <TripDescription
                                    trip={this.state.trip}
                                    getTrip={this.state.getTrip}
                                    editTrip={this.state.editTrip}/>}

                                */}

                                {trip.description}
                            </CardText>

                            {/*
                            there will be <Like /> component
                            */}

                            <div className='tripLikeIcon'>
                                <CardActions>
                                    <Checkbox
                                    checkedIcon={<ActionFavorite />}
                                    uncheckedIcon={<ActionFavoriteBorder />} />
                                </CardActions>
                            </div>
                        </Card>
                    </div>
                    }

                    {/*
                    there will be <Comments /> component
                    */}

                    <Card className='tripComments'>
                        <CardHeader
                            title={<h3>Comments</h3>}
                            actAsExpander={true}
                            showExpandableButton={true} />

                        <CardText expandable={true}>
                            {trip && <Comments tripId={this.state.trip.id} />}
                        </CardText>
                    </Card>

                    {/*
                    there will be <Checkpoint /> component
                    */}

                    <Card className='tripCheckpoints'>
                        <CardHeader
                            title={<h3>Checkpoints</h3>}
                            actAsExpander={true}
                            showExpandableButton={true} />

                        <CardText expandable={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
                            pellentesque.
                            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>
                    </Card>
                    </Card>
                </main>

                {/*
                left side navigation menu

                after getTrip done, add trip data to TripNavigation state
                */}
                <div className="HolyGrail-left">

                    {trip && <TripNavigation trip={this.state.trip} />}

                    <Divider />

                    {trip && <TripMenu trip={this.state.trip} getTrip={this.state.getTrip}/>}

                </div>

                <aside className="HolyGrail-right">
                </aside>
            </div>
            <footer></footer>
        </div>
        );
    }
}
