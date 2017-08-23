import React from 'react';
import axios from "axios";

import { Card, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { getTrip, formatDate } from './trip_service';
import { userId } from '../utils';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import Comments from "../comment/Comments";
import CommentIcon from 'material-ui/svg-icons/communication/chat';
import CheckpointIcon from 'material-ui/svg-icons/maps/pin-drop';
import NotFound from '../notFound';
import LoadProgress from '../load_progress';
import SubHeader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import TripEditorDescription from './trip_editor_description';
import TripEditorTitle from './trip_editor_title';
import TripNavigation from './trip_navigation';
import TripDelete from './trip_delete';
import './trip.less';

/*
import Checkpoint from '../checkpoint';
import Like from '../like';
import Photo from '../photo';
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
        getTrip(this.tripId).then(response => {
            const trip = response.data;
            this.setState({trip});
            }, error => {
                const trip = 'Trip not found';
                this.setState({trip});
            }
        );
    };

    //add trip data to state and rerender page
    componentDidMount() {
        this.getTrip();
    };


    render() {

        const trip = this.state.trip;

        if (trip==='Trip not found'){
            return <NotFound />
        }
        if (trip===null){
            return <LoadProgress />
        }
        else {
            return (
                <div className='HolyGrail'>
                    <div className='HolyGrail-body'>
                        <main className='HolyGrail-content'>
                            <Card>
                                <Card>
                                    <CardHeader className='tripPageHeader' >
                                        <div className='tripEdit'>
                                            {/*
                                            trip title
                                            */}
                                            <CardTitle
                                                title={<b>{this.state.trip.title}</b>}
                                                titleStyle={{fontSize: 25}}
                                            >
                                            {/*
                                            trip status and created date
                                            */}
                                                <CardTitle
                                                    title={this.state.trip.status}
                                                    subtitle={formatDate(trip.create_at)}
                                                />
                                            </CardTitle>


                                            {/*
                                            trip edit title button for author
                                            */}

                                            {(userId() === this.state.trip.user) ?
                                            <div className='tripEditIcon'>
                                                <TripEditorTitle
                                                    trip={this.state.trip}
                                                    text={this.state.trip.title}
                                                    tripId={this.state.trip.id}
                                                    getTrip={this.getTrip}
                                                />
                                            </div> : false}
                                        </div>
                                    </CardHeader>

                                    {/*
                                    there will be Google Map component
                                    */}

                                    <CardMedia className='tripGoogleMap'>
                                        <img src='/static/src/img/world_map.jpg' />
                                    </CardMedia>

                                    {/*
                                    there will be <Photo /> component
                                    */}

                                    <CardMedia className='tripPhotoGallery'>
                                        <h3>Trip Photo Gallery</h3>
                                    </CardMedia>

                                    {/*
                                    trip description
                                    */}

                                    <div className='tripEdit'>
                                        <CardText>
                                            <h2>Description:</h2>
                                        </CardText>

                                        {/*
                                        trip edit description button for author
                                        */}

                                        {(userId() === this.state.trip.user) ?
                                        <div className='tripEditIcon'>
                                            <TripEditorDescription
                                                trip={this.state.trip}
                                                text={this.state.trip.description}
                                                tripId={this.state.trip.id}
                                                getTrip={this.getTrip}
                                            />
                                        </div> : false
                                        }

                                    </div>

                                    <div className='tripDescription'>
                                        <TextField
                                            name='tripDescription'
                                            underlineShow={false}
                                            multiLine={true}
                                            value={trip.description}
                                            style={{fontSize: 20}}
                                        />
                                    </div>

                                    {/*
                                    there will be <Like /> component
                                    */}

                                    <div className='tripLikeIcon'>
                                        <CardActions>
                                            <Checkbox
                                                labelPosition={'left'}
                                                checkedIcon={<ActionFavorite />}
                                                uncheckedIcon={<ActionFavoriteBorder />}
                                            />
                                        </CardActions>
                                    </div>
                                </Card>

                                {/*
                                there will be <Comments /> component
                                */}

                                <Card className='tripComments'>
                                    <CardHeader
                                        title={<h3>Comments</h3>}
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                        closeIcon={<CommentIcon />}
                                    />

                                    <CardText expandable={true}>
                                        <Comments tripId={this.state.trip.id} />
                                    </CardText>
                                </Card>

                                {/*
                                there will be <Checkpoint /> component
                                */}

                                <Card className='tripCheckpoints'>
                                    <CardHeader
                                        title={<h3>Checkpoints</h3>}
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                        closeIcon={<CheckpointIcon />}
                                    />

                                    <CardText expandable={true}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Donec mattis pretium massa. Aliquam erat volutpat.
                                        Nulla facilisi.
                                        Donec vulputate interdum sollicitudin.
                                        Nunc lacinia auctor quam sed pellentesque.
                                        Aliquam dui mauris, mattis quis lacus id, pellentesque
                                        lobortis odio.
                                    </CardText>
                                </Card>
                            </Card>
                        </main>

                        {/*
                        left side navigation menu with divider and Delete button for author
                        */}
                        <div className='HolyGrail-left'>

                            <TripNavigation userId={this.state.trip.user} />

                            {(userId() === this.state.trip.user) ?
                            <TripDelete
                                tripId={this.state.trip.id}
                                history={this.props.history}
                            /> : false}

                        </div>

                        <aside className='HolyGrail-right'>
                        </aside>
                    </div>
                    <footer className='footer'></footer>
                </div>
            );
        }
    }
}
