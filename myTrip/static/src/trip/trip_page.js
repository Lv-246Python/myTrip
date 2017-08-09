import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {List, ListItem} from 'material-ui/List';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import EditDescriptionIcon from 'material-ui/svg-icons/editor/border-color';
import TitleIcon from 'material-ui/svg-icons/editor/title';
import './trip.less'

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
            titleEdit: false,
            descriptionEdit: false,
            openDelete: false,
            disabledEdit: true,
            disabledDelete: true,
            editTitleText: '',
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
                render other part of page while trip=null, after componentDidMount, rerender page with trip data
                */}

                {trip &&

                <div>
                    <Card>
                        <Card>
                            <CardHeader
                            className='tripPageHeader'
                            title={<h3>{this.state.trip.title}</h3>}
                            subtitle={moment(this.state.trip.create_at).format('MMMM Do, h:mm a')}
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
                            {this.state.trip.description}
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>

              </Card>
            </main>

            {/*
            left side menu
            */}

            <nav className="HolyGrail-left">
              <List>
                <ListItem
                  className='buttonHome'
                  primaryText="Home"
                  leftIcon={<HomeIcon />}
                  containerElement={<Link to='/' />}/>

                <ListItem
                  className='buttonProfile'
                  primaryText="Profile"
                  leftIcon={<ProfileIcon />} />

                <ListItem
                  className='buttonAllTrips'
                  primaryText="All trips"
                  leftIcon={<AllTripsIcon />}
                  containerElement={<Link to='/trips' />}/>

                <ListItem
                  className='buttonEditTrip'
                  primaryText="Edit trip"
                  leftIcon={<EditIcon />}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={[

                      <ListItem
                        key={1}
                        className='buttonEditTitle'
                        primaryText="Edit title"
                        leftIcon={<TitleIcon />}
                      />,

                      <ListItem
                        key={2}
                        className='buttonEditDescription'
                        primaryText="Edit description"
                        leftIcon={<EditDescriptionIcon />}
                      />,
                  ]} />

                <ListItem
                  className='buttonDeleteTrip'
                  primaryText="Delete trip"
                  leftIcon={<DeleteIcon />} />

              </List>
            </nav>

            <aside className="HolyGrail-right"></aside>
          </div>
          <footer></footer>
        </div>
        );
    }
}
