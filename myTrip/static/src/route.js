import React from "react";
import { Route, Switch, Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from "./home/home.js";
import Comment from "./comment/comment.js";
import Login from "./registration/login.js";
import Registration from "./registration/registration.js";
import { logoutService } from './registration/registration.service.js'


injectTapEventPlugin();

class Header extends React.Component {
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

class NotFound extends React.Component {
    render() {
        return <h1>Not found</h1>
    }
}

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/registration'
                        render={(props) => <Registration
                            loginHandler={this.props.loginHandler}
                            {...props}
                        /> }
                    />
                    <Route exact path='/login'
                        render={(props) => <Login
                            loginHandler={this.props.loginHandler}
                            {...props}
                        />}
                    />
                     <Route exact path='/comment' component={Comment} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'logged':false};
        this.loginHandler = this.loginHandler.bind(this);
    }
    componentWillMount() {
        let logged = document.cookie.indexOf('sessionid') != -1;
        this.setState({logged})
    }
    loginHandler(value) {
        this.setState({'logged':value});
    }
    render() {
        return (
           <MuiThemeProvider>
               <div>
                   <Header logged={this.state.logged} loginHandler={this.loginHandler}/>
                   <Main loginHandler={this.loginHandler} />
               </div>
            </MuiThemeProvider>
        );
    }
}
