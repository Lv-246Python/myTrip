import React from 'react';
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ProfileIcon from 'material-ui/svg-icons/social/person';


export default class CreateTripNavigation extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className='createTripNavigation' >
                <List>
                    <ListItem
                        key='profile'
                        className='buttonProfile'
                        primaryText='My profile'
                        leftIcon={<ProfileIcon />}
                        containerElement={<Link to='/profile' />}
                    />
                    <ListItem
                        key='trips'
                        className='buttonAllTrips'
                        primaryText='All trips'
                        leftIcon={<AllTripsIcon />}
                        containerElement={<Link to='/trips' />}
                    />
                    <ListItem
                        key='home'
                        className='buttonHome'
                        primaryText='Home'
                        leftIcon={<HomeIcon />}
                        containerElement={<Link to='/' />}
                    />
                    <ListItem
                        key='help'
                        className='buttonHelp'
                        primaryText='Help'
                        leftIcon={<HelpIcon />}
                        containerElement={<Link to='/help' />}
                    />
                </List>
            </div>
        );
    }
}
