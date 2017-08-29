import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./home/home";
import Login from "./registration/login";
import Registration from "./registration/registration";
import CreateTrip from "./trip/create_trip";
import TripList from "./trip/trip_list";
import TripPage from "./trip/trip_page";
import Subscribes from "./subscribe/Subscribes";
import NotFound from './notFound';


export default class MainRoute extends React.Component {
    componentDidMount = () => {
        if (window.location.hash == '#_=_') {
            window.location.hash = '';
            history.pushState('', document.title, window.location.pathname);
        }
    }
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
                    <Route exact path='/create_trip' component={CreateTrip} />
                    <Route exact path='/trips' component={TripList} />
                    <Route exact path='/trip/:id' component={TripPage} />
                    <Route exact path='/subscribes' component={Subscribes} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}
