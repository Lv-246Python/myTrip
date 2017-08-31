import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./home/home";
import Help from './help/Help'
import Comments from "./comment/Comments";
import Login from "./registration/login";
import Registration from "./registration/registration";
import Profile from "./profile/profile";
import ProfileByID from "./profile/profileByID";
import CreateTrip from "./trip/create_trip";
import TripList from "./trip/trip_list";
import TripPage from "./trip/trip_page";
import Subscribes from "./subscribe/Subscribes";
import TripMap from "./checkpoint/trip-map.js";
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
                    <Route exact path='/login/:hash?'
                        render={(props) => <Login
                            loginHandler={this.props.loginHandler}
                            {...props}
                        />}
                    />
                    <Route exact path='/help' component={Help} />
                    <Route exact path='/create_trip' component={CreateTrip} />
                    <Route exact path='/trips' component={TripList} />
                    <Route exact path='/trip/:id' component={TripPage} />
                    <Route exact path='/subscribes' component={Subscribes} />
                    <Route exact path='/comments'
                        component={() => (<Comments
                                                tripId={1}
                                                tripPhotoId="/photo/1" />)}/>
                    <Route exact path='/trip-map' component={TripMap} />
                    <Route exact path="/profile/" component={Profile} />
                    <Route exact path="/profile/:id" component={ProfileByID} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}
