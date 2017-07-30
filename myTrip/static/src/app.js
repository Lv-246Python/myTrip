import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import axios from "axios"
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from "./home.js";
import Login from "./login.js";
import Registration from "./registration.js";


injectTapEventPlugin();

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.get('api/v1/auth/logout/').then((response) => {
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
                        label='REGISTRATION'
                        containerElement={<Link to="/registration"/>}
                        labelStyle = {{
                            fontSize:"1.3em",
                            color:"white"
                        }}
                    />
                    <FlatButton
                        label='LOGIN'
                        containerElement={<Link to="/login"/>}
                        labelStyle = {{
                            fontSize:"1.3em",
                            color:"white"
                        }}
                    />
                </div>
            )
        } else {
            elementRight =  (
                <div className='title'>
                    <FlatButton
                        label='LOGOUT'
                        onTouchTap = {this.logout}
                        labelStyle = {{
                            fontSize:"1.3em",
                            color:"white"
                        }}
                    />
                </div>
            )
        }
        return (
            <AppBar
                className='header'
                style = {{
                    height: "80px"
                }}
                iconStyleLeft = {{
                    fontSize:"2em"
                }}
                iconElementLeft = {
                    <div className='title'>
                        <img className='header_icon' src='static/src/img/logo.png' />
                        <Link to='/home'>TripTracker</Link>
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
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}

class Layout extends React.Component {
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

ReactDOM.render(
    <Router>
        <Layout></Layout>
    </Router>,
    document.getElementById('app')
);
