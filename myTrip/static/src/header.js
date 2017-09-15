import React from "react";
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { logged } from './utils';
import { logoutService } from './registration/registration.service';

const style = {
    LabelSize : {
        fontSize:"1em"
    },

    myTrips : {
        fontSize:"1.4em"
    },

    iconLeftStyle : {
         fontSize:"2em"
    },

    iconRightStyle : {
        marginBottom:"8px",
        display:"flex",
        alignItems:"center"
    }
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        logoutService()
            .then((response) => {
                this.props.loginHandler(false);
            })
            .catch((error) => console.dir(error));

    }

    render() {
        let elementRight;
        if (!logged()) {
            elementRight = (
                <div className='title'>
                    <RaisedButton
                        label='REGISTRATION'
                        secondary={true}
                        labelStyle = { style.myTrips }
                        containerElement={<Link to="/registration"/>}
                    />
                    <FlatButton
                        className='header_btn'
                        label='LOGIN'
                        containerElement={<Link to="/login"/>}
                        labelStyle = {style.LabelSize}
                    />
                </div>
            )
        } else {
            elementRight =  (
                <div className='title'>
                    <RaisedButton
                        label='MY TRIPS'
                        secondary={true}
                        labelStyle = { style.myTrips }
                        containerElement={<Link to="/my_trips"/>}
                    />

                    <FlatButton
                        label='PROFILE'
                        className='header_btn'
                        labelStyle = { style.LabelSize }
                        containerElement={<Link to="/profile/"/>}
                    />

                    <FlatButton
                        label='LOGOUT'
                        className='header_btn'
                        onTouchTap = {this.logout}
                        labelStyle = { style.LabelSize }
                    />
                </div>
            )
        }
        return (
            <AppBar
                //style={{position: 'fixed'}}
                className='header'
                iconStyleLeft = { style.iconLeftStyle }
                iconElementLeft = {
                    <div className='title'>
                        <img className='header_icon' src='/static/src/img/logo.png' />
                        <Link to='/'>TripTracker</Link>
                    </div>
                }
                iconElementRight = { elementRight }
                iconStyleRight = { style.iconRightStyle }
            />
        );
    }
}
