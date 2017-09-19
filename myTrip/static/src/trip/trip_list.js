import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import { GridList } from 'material-ui/GridList';
import { getTrip, formatDate } from './trip_service';
import { logged } from '../utils';
import AddIcon from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import LoadProgress from '../load_progress';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import RaisedButton from 'material-ui/RaisedButton';
import TripListNavigation from './trip_list_navigation';
import TripTile from './trip_tile';
import './trip.less';
import moment from 'moment';

const tripListColumns = 3;
const tripListPadding = 20;


export default class TripList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrips: null,
            page: 0,
            lastPage: 0,
            disabledFirst: false,
            disabledLast: false,
        };
    };

    //callback function, that returns last 6 trips JSONs from backend
    getData = () => {
        let url = '/api/v1/trip/';
        if (this.state.page){
            url += '?page=' + this.state.page;
        };
        axios.get(url).then(response => {
            const allTrips = response.data.trips;
            const allPages = response.data.all_pages;
            this.setState({
                allTrips: allTrips,
                lastPage: allPages,
            });
            this.firstPageFunc();
            this.lastPageFunc();
        });
    };

    //function for disable previous button on a first page
    firstPageFunc = () => {
        (this.state.page === 0)
        ? this.setState({disabledFirst: true}) : this.setState({disabledFirst: false})
    }

    //function for disable next button on a last page
    lastPageFunc = () => {
        (this.state.page === this.state.lastPage)
        ? this.setState({disabledLast: true}) : this.setState({disabledLast: false})
    }

    //function for next page button
    nextPage = () => {
        this.setState({page: this.state.page + 1});
    };

    //function for previous page button
    prevPage = () => {
        this.setState({page: this.state.page && this.state.page - 1});
    };

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
                <div>
                    <div className='tripList'>
                        <div className='side'>
                            <TripListNavigation />
                        </div>
                        <div className='allTrips'>
                            <Card>
                                <div className='tripListHeader'>
                                    <CardHeader
                                        title={<h2>All trips</h2>}
                                        subtitle={'Share your adventure'}
                                    />

                                    {/*
                                    create trip button for logged user
                                    */}
                                    {(logged())?
                                    <RaisedButton
                                        primary={true}
                                        label='Create trip'
                                        labelPosition='before'
                                        icon={<AddIcon />}
                                        containerElement={<Link to='/create_trip' />}

                                    /> : false}

                                </div>
                                <CardMedia>
                                    <div className='gridList'>
                                        <GridList
                                            cellHeight={255}
                                            cols={tripListColumns}
                                            padding={tripListPadding}
                                        >
                                            {/*
                                            wrap every JSON with trip data into own trip tile
                                            */}

                                            {this.state.allTrips.map(trip => (
                                                <TripTile
                                                    key={trip.id}
                                                    tripId={trip.id}
                                                    user={trip.user}
                                                    userName={trip.user_name}
                                                    title={trip.title}
                                                    description={trip.description}
                                                    status={trip.status}
                                                    cover={trip.src}
                                                    created={moment(trip.create_at)
                                                             .format('h:mm a, Do MMMM YYYY')}
                                                    updated={formatDate(trip.update_at)}
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
                                            disabled={this.state.disabledFirst}
                                            onTouchTap={this.prevPage}
                                        />
                                        <FlatButton
                                            label='Next'
                                            labelPosition='before'
                                            icon={<RightIcon />}
                                            disabled={this.state.disabledLast}
                                            onTouchTap={this.nextPage}
                                        />
                                    </CardActions>
                                </div>
                            </Card>
                        </div>
                        <div className='side'>
                        </div>
                    </div>
                    <footer className='footer'></footer>
                </div>
            );
        }
    };
};
