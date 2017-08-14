import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import TripMenu from './trip_menu'
import './trip.less'


export default class TripNavigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props: props,
            tripId: this.props.trip.id,
            open: false,
        };
    };


    render() {

        const trip = this.state.trip;

        return (

            <List>
                <ListItem
                    key='home'
                    className='buttonHome'
                    primaryText="Home"
                    leftIcon={<HomeIcon />}
                    containerElement={<Link to='/' />}/>

                <ListItem
                    key='trips'
                    className='buttonAllTrips'
                    primaryText="All trips"
                    leftIcon={<AllTripsIcon />}
                    containerElement={<Link to='/trips' />}/>

                <ListItem
                    key='profile'
                    className='buttonProfile'
                    primaryText="Profile"
                    leftIcon={<ProfileIcon />}
                    containerElement={<Link to='/profile' />} />

              </List>
        );
    }
}
