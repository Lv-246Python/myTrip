import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Registration from "./registration.js"
import Home from "./home.js"

class Header extends React.Component {
    render() {
        return (
        <header>
            <div className="row">
                <div className="col-md-12">
                    <div className="logo">
                        <a href="#"><img src="./img/logo.png" alt="logo" /></a>
                        <span id="logo"><Link to='/home'>TripTracker.com</Link></span>
                        <span id="login"><Link to="#">LOGIN</Link></span>
                        <span id="register"><Link to='/registraion'>REGISTRATION</Link></span>
                    </div>
                </div>
            </div>
        </header>
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/registraion' component={Registration} />
                    <Route exact path='/home' component={Home} />
                </Switch>
            </main>
        );
    }
}

class Layout extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header/>
                <Main/>
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <Layout></Layout>
    </Router>,
    document.getElementById('app')
);