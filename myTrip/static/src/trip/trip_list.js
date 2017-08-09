import React from 'react';
import axios from "axios";
import moment from 'moment';

import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import TripTile from './trip_tile'
import './trip.less'


const styles = {

    gridList: {
        width: 1500,
    },

    buttons: {
        display: 'flex',
        justifyContent: 'center',
    },
};


export default class TripList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        //put all trips in array
            allTrips: [],
            page: 0
        };
    };

    //callback function, that returns last 6 trips JSONs from backend
    getData = () => {
        let url = '/api/v1/trip/';
        if (this.state.page){
            url += '?page=' + this.state.page;
        }
        axios.get(url).then(response => {
            const allTrips = response.data;
            this.setState({allTrips});
        });
    };

    //function for next page button
    nextPage = () => {
        this.setState({page: this.state.page + 1});
    };

    //function for previous page button
    prevPage = () => {
        this.setState({page: this.state.page && this.state.page - 1});
    };

/* callback function, that returns JSON of a first photo of chosen trip from backend

    getTripPhoto = () => {
        axios.get(`/api/v1/trip/${trip.id}/photo/1/` ).then(response => {
            const tripPhoto = response.data;
            this.setState({tripPhoto});
        });
    };
*/

    //renders only after data gotten
    componentDidMount() {
        this.getData();
    };

    //if page of trip-list was changed by next/previous buttons,
    //render trip list with new list data
    componentDidUpdate(prevProps, prevState) {
        this.state.page !== prevState.page && this.getData();
        console.log(this.state.allTrips.length)
    };

    render() {
        return (
            <div className='allTrips'>

                <Card>
                    <CardHeader
                    title={<h2>All trips</h2>}
                    subtitle={'Share your adventure'}
                    />

                    <CardMedia>
                        <GridList className='gridList'
                            cellHeight={'auto'}
                            style={styles.gridList}
                            cols={3}
                            padding={20} >

                            {/*
                            wrap every JSON with trip data into own trip tile
                            */}

                            {this.state.allTrips.map(trip => (
                                <TripTile
                                key={trip.id}
                                tripId={trip.id}
                                title={trip.title}
                                description={trip.description}
                                user={trip.user}
                                created={moment(trip.create_at).format('MMMM Do, h:mm a')} />
                            ))}
                        </GridList>
                    </CardMedia>

                    <CardActions style={styles.buttons}>
                        <FlatButton label="Previous" onTouchTap={this.prevPage} />
                        <FlatButton label="Next" onTouchTap={this.nextPage} />
                    </CardActions>

                </Card>
            </div>
        );
    };
};
