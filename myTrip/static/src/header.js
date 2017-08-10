import React from "react";
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import { logged } from './utils';
import { logoutService } from './registration/registration.service';
import { LabelSize, iconLeftStyle, iconRightStyle } from './header.style';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        logoutService().then((response) => {
            this.props.loginHandler(false);
        })
    }

    render() {
        let elementRight;
        if (!logged()) {
            elementRight = (
                <div className='title'>
                    <FlatButton
                        className='header_btn'
                        label='REGISTRATION'
                        labelStyle={LabelSize}
                        containerElement={<Link to="/registration"/>}
                    />
                    <FlatButton
                        className='header_btn'
                        label='LOGIN'
                        containerElement={<Link to="/login"/>}
                        labelStyle = {LabelSize}
                    />
                </div>
            )
        } else {
            elementRight =  (
                <div className='title'>
                    <FlatButton
                        label='LOGOUT'
                        className='header_btn'
                        onTouchTap = {this.logout}
                        labelStyle = {LabelSize}
                    />
                </div>
            )
        }
        return (
            <AppBar
                className='header'
                iconStyleLeft = { iconLeftStyle }
                iconElementLeft = {
                    <div className='title'>
                        <img className='header_icon' src='/static/src/img/logo.png' />
                        <Link to='/'>TripTracker</Link>
                    </div>
                }
                iconElementRight = { elementRight }
                iconStyleRight = { iconRightStyle }
            />
        );
    }
}
