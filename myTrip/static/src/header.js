import React from "react";
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import { logoutService } from './registration/registration.service.js'


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        logoutService().then((response) => {
            if (response.status == 200) {
                this.props.loginHandler(false);
            }
        })
    }

    render() {
        let elementRight;
        if (!this.props.logged) {
            elementRight = (
                <div className='title'>
                    <FlatButton
                        className='header_btn'
                        label='REGISTRATION'
                        labelStyle={{fontSize:'1.3em'}}
                        containerElement={<Link to="/registration"/>}
                    />
                    <FlatButton
                        className='header_btn'
                        label='LOGIN'
                        containerElement={<Link to="/login"/>}
                        labelStyle = {{fontSize:"1.3em"}}
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
                        labelStyle = {{fontSize:"1.3em"}}
                    />
                </div>
            )
        }
        return (
            <AppBar
                className='header'
                iconStyleLeft = {{
                    fontSize:"2em"
                }}
                iconElementLeft = {
                    <div className='title'>
                        <img className='header_icon' src='static/src/img/logo.png' />
                        <Link to='/'>TripTracker</Link>
                    </div>
                }
                iconElementRight = {elementRight}
                iconStyleRight = {{
                    marginBottom:"8px",
                    display:"flex",
                    alignItems:"center",
                }}
            />
        );
    }
}