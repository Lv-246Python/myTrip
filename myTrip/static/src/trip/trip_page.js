import React from 'react';
import axios from "axios";
import moment from 'moment';

import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FlatButton from 'material-ui/FlatButton'
import TripItem from './trip_item'

/*
import Checkpoint from 'checkpoint';
import Comment from 'comment';
import Like from 'like';
import Photo from 'photo'
*/

const styles = {
    card: {
        maxWidth: 800,
        margin: 'auto'
    },
    checkbox: {
        marginLeft: 750,
        marginBottom: 16
    },
};


export default class TripPage extends React.Component {
    constructor(props){
        super(props);
        //get trip id from page id
        this.tripId = this.props.match.params.id;
        this.state = {
            trip: null
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
            <Card style={styles.card}>

                {/*
                render other part of page while trip=null, after componentDidMount, rerender page with trip data
                */}

                {trip && <TripItem trip={trip} />}

                {/*
                there will be <Comment /> component
                */}

                <Card>
                    <CardHeader
                    title={<h3>Comments</h3>}
                    actAsExpander={true}
                    showExpandableButton={true} />

                    <CardText className='comments' expandable={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>

                {/*
                there will be <Checkpoint /> component
                */}

                <Card>
                    <CardHeader
                    title={<h3>Checkpoints</h3>}
                    actAsExpander={true}
                    showExpandableButton={true} />

                    <CardText className='checkpoints' expandable={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>
            </Card>
        );
    }
}
