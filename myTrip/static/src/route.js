import React from "react";
import { Route, Switch } from 'react-router-dom';

<<<<<<< bd25c7b38bac1baef00134e99654d41094a4a284
import Home from "./home/home";
import Comments from "./comment/Comments";
import Login from "./registration/login";
import Registration from "./registration/registration";
import TripList from "./trip/trip_list";
import TripPage from "./trip/trip_page";
import NotFound from './notFound';
=======
import Home from "./home/home.js";
import Comments from "./comment/Comments.js";
import Login from "./registration/login.js";
import Registration from "./registration/registration.js";
import CheckpointTestPage from "./checkpoint/testing-page-for-checkpoints.js";
import NotFound from './notFound.js'
>>>>>>> checkpoint V1.1.0

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
<<<<<<< bd25c7b38bac1baef00134e99654d41094a4a284
                    <Route exact path='/trips' component={TripList} />
                    <Route exact path='/trip/:id' component={TripPage} />
                    <Route exact path='/comments' component={Comments} />
=======
                    <Route exact path='/comment' component={Comment} />
                    <Route exact path='/test-checkpoint' component={CheckpointTestPage} />
>>>>>>> checkpoint V1.1.0
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}
