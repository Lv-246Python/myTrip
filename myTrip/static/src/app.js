import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Link} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Registration from "./registration.js";
import Home from "./home.js";

injectTapEventPlugin();

class Header extends React.Component {
    render() {
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
                        <img className='header_icon' src='static/img/logo.png' />
                        <Link to='/home'>TripTracker</Link>
                    </div>
                }
                iconElementRight = {
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
                            containerElement={<Link to="/home"/>}
                            labelStyle = {{
                                fontSize:"1.3em",
                                color:"white"
                            }}
                        />
                    </div>
                }
                iconStyleRight = {{
                    marginBottom:"8px",
                    display:"flex",
                    alignItems:"center",
                }}
            />
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/registration' component={Registration} />
                    <Route exact path='/home' component={Home} />
                </Switch>
            </main>
        );
    }
}

class Layout extends React.Component {
    render() {
        return (
           <MuiThemeProvider>
               <div>
                   <Header/>
                   <Main/>
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
