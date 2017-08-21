import React from 'react';
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import './trip.less'


export default class TripNavigation extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <List>
                <ListItem
                    key='home'
                    className='buttonHome'
                    primaryText='Home'
                    leftIcon={<HomeIcon />}
                    containerElement={<Link to='/' />}
                />

                <ListItem
                    key='trips'
                    className='buttonAllTrips'
                    primaryText='All trips'
                    leftIcon={<AllTripsIcon />}
                    containerElement={<Link to='/trips' />}
                />

                <ListItem
                    key='profile'
                    className='buttonProfile'
                    primaryText='Author'
                    leftIcon={<ProfileIcon />}
                    containerElement={<Link to={`/profile/${this.props.userId}`} />}
                />
            </List>
        );
    }
}
