import React from 'react';
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import { logged } from '../utils';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MyTripsIcon from 'material-ui/svg-icons/maps/terrain';
import ProfileIcon from 'material-ui/svg-icons/social/person';


export default class CreateTripNavigation extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className='createTripNavigation' >
                <List>
                    {(logged()) ?
                    <div>
                        <ListItem
                            key='profile'
                            className='buttonProfile'
                            primaryText='My profile'
                            leftIcon={<ProfileIcon />}
                            containerElement={<Link to='/profile' />}
                        />
                        <ListItem
                            key='my_trips'
                            className='buttonMyTrips'
                            primaryText='My trips'
                            leftIcon={<MyTripsIcon />}
                            containerElement={<Link to='/my_trips' />}
                        />
                    </div> : false}

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
