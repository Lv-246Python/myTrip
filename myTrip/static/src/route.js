import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./home/home.js";
import Comments from "./comment/Comments.js";
import Login from "./registration/login.js";
import Registration from "./registration/registration.js";
import TripList from "./trip/trip_list.js";
import TripPage from "./trip/trip_page.js";
import NotFound from './notFound.js';

export default class MainRoute extends React.Component {
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
                    <Route exact path='/comment' component={Comments} />
                    <Route exact path='/trips' component={TripList} />
                    <Route exact path='/trip/:id' component={TripPage} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}
