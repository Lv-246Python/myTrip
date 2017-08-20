import React from 'react';
import axios from "axios";

import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import { GridList } from 'material-ui/GridList';
import { getTrip, formatDate } from './trip_service';
import FlatButton from 'material-ui/FlatButton';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import LoadProgress from '../load_progress';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import TripTile from './trip_tile'
import './trip.less'


export default class TripList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrips: null,
            page: 0,
            disabled: false,
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
            this.firstPage();
        });
    };

    //function for disable previous button on a first page
    firstPage = () => {
        (this.state.page === 0)
        ? this.setState({disabled: true}) : this.setState({disabled: false})
    }

    //function for next page button
    nextPage = () => {
        this.setState({page: this.state.page + 1});
    };

    //function for previous page button
    prevPage = () => {
        this.setState({page: this.state.page && this.state.page - 1});
    };

    /*
    callback function, that returns JSON of a first photo of chosen trip from backend

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

    /*
    if page of trip-list was changed by next/previous buttons,
    render trip-list with new list data
    */
    componentDidUpdate(prevProps, prevState) {
        this.state.page !== prevState.page && this.getData();
    };

    render() {

        const allTrips = this.state.allTrips;

        if (allTrips === null){
            return <LoadProgress />
        }
        else {
            return (
                <main className='allTrips'>
                    <Card>
                        <CardHeader
                            title={<h2>All trips</h2>}
                            subtitle={'Share your adventure'}
                        />
                        <CardMedia>
                            <div className='gridList'>
                                <GridList
                                    cellHeight={'auto'}
                                    cols={3}
                                    padding={20}
                                >
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
                                            created={formatDate(trip.create_at)}
                                        />
                                    ))}
                                </GridList>
                            </div>
                        </CardMedia>
                        <div className='directionButtons'>
                            <CardActions>
                                <FlatButton
                                    label='Previous'
                                    icon={<LeftIcon />}
                                    disabled={this.state.disabled}
                                    onTouchTap={this.prevPage}
                                />
                                <FlatButton
                                    label='Next'
                                    labelPosition='before'
                                    icon={<RightIcon />}
                                    onTouchTap={this.nextPage}
                                />
                            </CardActions>
                        </div>
                    </Card>
                    <footer className='footer'></footer>
                </main>
            );
        }
    };
};
