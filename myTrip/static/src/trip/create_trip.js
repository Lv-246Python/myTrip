import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import { logged } from '../utils';
import { Step, Stepper, StepButton, StepLabel, StepContent } from 'material-ui/Stepper';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import CreateAnnouncedTrip from './create_announced_trip.js';
import CreateFinishedTrip from './create_finished_trip.js';
import CreateNewTrip from './create_new_trip.js';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AnnounceIcon from 'material-ui/svg-icons/action/today';
import DoneIcon from 'material-ui/svg-icons/toggle/check-box';
import ProgressIcon from 'material-ui/svg-icons/action/trending-up';


let newTripDescription = `
After selecting the option "Start a new trip" you can specify the name of your trip, its
description and start the trip by clicking the "Start" button. This will create an individual page
for your trip, with the status "In progress", and TripTracker will begin to track your posts on
social networks and form the route of your trip on them in real time until you finish your trip by
clicking on the page of your trip the "Finish" button. After that, the status of your trip will
be changed to "Finished"
`

let announceTripDescription = `
Having chosen the option "To announce a future trip" you can specify the name of your trip and its
description, as well as set the time for the approximate start and finish of the planned trip.
This way you will create an individual page for your trip, with the status "Announced", where you
can add checkpoints that you plan to visit, thereby creating the route of the expected trip. When
the time comes for the beginning of this trip, TripTracker will offer you to start the trip,
postpone or cancel. Starting the journey, the status of your trip will change to "In progress"
`

let finishedTripDescription = `
The "Download a finished trip" feature will allow you to create a personal page of the route you
have already traversed with the status "Finished". You will be able to give him a name,
description, specify the period in which the trip took place. Based on this period, TripTracker
will collect your posts on social networks, and add them to your route map. If you want, you can
add or remove additional places, photos, description
`


export default class CreateTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stepIndex: 0,
            status: 0,
        };
    };

    // function for choose trip status
    handleNext = (x) => {
        this.setState({stepIndex: this.state.stepIndex + 1, status: x});
    };


    render() {

        const stepIndex = this.state.stepIndex;

        if (!logged()){
            this.props.history.push('/login')}
        else{
            return (
                <div className='createTrip' >
                    <div className='createTripNavigation' >
                        <List>
                            <ListItem
                                key='home'
                                className='buttonHome'
                                primaryText='Home'
                                leftIcon={<HomeIcon />}
                                containerElement={<Link to='/' />}
                            />
                            <ListItem
                                key='trips'
                                className='buttonAllTrips'
                                primaryText='All trips'
                                leftIcon={<AllTripsIcon />}
                                containerElement={<Link to='/trips' />}
                            />
                        </List>
                    </div>
                    <div className='stepperCreateTrip' >
                        <Stepper activeStep={stepIndex} orientation='vertical'>
                            <Step>
                                <StepButton onClick={() => this.setState({stepIndex: 0})}>
                                    <h3>Choose type of your trip</h3>
                                </StepButton>
                                <StepContent>
                                    <List>
                                        <ListItem
                                            onClick={() => this.handleNext(0)}
                                            hoverColor='#E0F7FA'
                                        >
                                            <ListItem
                                                primaryText='Start a new trip'
                                                leftIcon={<ProgressIcon color='black'/>}
                                                style={{backgroundColor: '#00BCD4', fontSize: 20}}
                                            />
                                            <CardText style={{fontSize: 16}}>
                                                {newTripDescription}
                                            </CardText>
                                        </ListItem>

                                        <ListItem
                                            onClick={() => this.handleNext(1)}
                                            hoverColor='#F9FBE7'
                                        >
                                            <ListItem
                                                primaryText='To announce a future trip'
                                                leftIcon={<AnnounceIcon color='black'/>}
                                                style={{backgroundColor: '#CDDC39', fontSize: 20}}
                                            />
                                            <CardText style={{fontSize: 16}}>
                                                {announceTripDescription}
                                            </CardText>
                                        </ListItem>

                                        <ListItem
                                            onClick={() => this.handleNext(2)}
                                            hoverColor='#FFF8E1'
                                        >
                                            <ListItem
                                                primaryText='Download a finished trip'
                                                leftIcon={<DoneIcon color='black'/>}
                                                style={{backgroundColor: '#FFC107', fontSize: 20}}
                                            />
                                            <CardText style={{fontSize: 16}}>
                                                {finishedTripDescription}
                                            </CardText>
                                        </ListItem>
                                    </List>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                    <h3>Add information about your trip</h3>
                                </StepButton>
                                <StepContent style={{width: '100%', paddingTop: 20}}>

                                    {(this.state.status === 0) ?
                                    <CreateNewTrip
                                            status={this.state.status}
                                            history={this.props.history}
                                        /> : false}

                                    {(this.state.status === 1) ?
                                    <CreateAnnouncedTrip
                                            status={this.state.status}
                                            history={this.props.history}
                                        /> : false}

                                    {(this.state.status === 2) ?
                                    <CreateFinishedTrip
                                            status={this.state.status}
                                            history={this.props.history}
                                        /> : false}

                                </StepContent>
                            </Step>
                        </Stepper>
                    </div>
                </div>
            );
        }
    }
}
