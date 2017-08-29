import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import TripMenu from './trip_menu'
import './trip.less'

import Comments from '../comment/Comments';
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

            openDeleteTrip: false,
            disabledDelete: true,

            openEditTrip: false,
            disabledEdit: true,

            titleEdit: false,
            editTitleText: '',

            descriptionEdit: false,
            editDescriptionText: '',
        };
    };


    //get trip data from backend by url with trip id
    getTrip = () => {
        axios.get(`/api/v1/trip/${this.tripId}/`).then(response => {
            const trip = response.data;
            this.setState({trip: trip});
        });
    };
    //edit trip title by url with trip id
    putTripTitle(tripId, tripTitle) {
        return axios.put(`api/v1/trip/${this.tripId}/`,
        {tripTitle})
    };
    //edit trip description by url with trip id
    putTripDescription(tripId, tripDescription) {
        return axios.put(`api/v1/trip/${this.tripId}/`,
        {tripDescription})
    };
    //delete trip from backend by url with trip id
    deleteTrip(tripId){
        axios.delete(`api/v1/trip/${this.tripId}/`)
            .then(() => this.getTrip());
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
                            <CardHeader
                              className='tripPageHeader'
                              title={<h3>{trip.title}</h3>}
                              subtitle={moment(trip.create_at).format('MMMM Do, h:mm a')}
                            />
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
                there will be <Comment /> component
                */}

                <Card className='tripComments'>
                    <CardHeader
                      title={<h3>Comments</h3>}
                      actAsExpander={true}
                      showExpandableButton={true} />

                    <CardText expandable={true}>
                        {trip &&<Comments tripId={this.state.trip.id} />}
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
            left side menu
            */}

            <TripMenu />

            <aside className="HolyGrail-right"></aside>
          </div>
          <footer>.</footer>
        </div>
        );
    }
}
