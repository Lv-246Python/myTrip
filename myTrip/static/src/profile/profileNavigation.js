import React from 'react';
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import { logged } from '../utils';
import AuthorIcon from 'material-ui/svg-icons/maps/person-pin';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import MyTripsIcon from 'material-ui/svg-icons/maps/terrain';
import FollowersIcon from 'material-ui/svg-icons/maps/local-library';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import Subscribe from "../subscribe/Subscribe";
// import '../trip.less'


export default class ProfileNavigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        return (
            <div>
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
                    </div>
                    : false}

                    <ListItem
                        key='trips'
                        className='buttonAllTrips'
                        primaryText='All trips'
                        leftIcon={<AllTripsIcon />}
                        containerElement={<Link to='/trips' />}
                    />

                    <ListItem
                        key='followers'
                        className='buttonFollowers'
                        primaryText='Subscribers'
                        leftIcon={<FollowersIcon />}
                        onTouchTap={this.handleOpen}
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
