import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import { logged } from '../utils';
import { Step, Stepper, StepButton, StepLabel, StepContent } from 'material-ui/Stepper';
import AddIcon from 'material-ui/svg-icons/content/add';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CreateAnnouncedTrip from './create_announced_trip.js';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AnnounceIcon from 'material-ui/svg-icons/action/today';
import DoneIcon from 'material-ui/svg-icons/toggle/check-box';
import ProgressIcon from 'material-ui/svg-icons/action/trending-up';

export default class CreateTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stepIndex: 0,
            logged: logged,
            status: 0,
        };
    };

    // function for New trip
    handleNextProgress = () => {
        this.setState({stepIndex: this.state.stepIndex + 1, status: 0});
    };

    // function for Announced trip
    handleNextAnnounce = () => {
        this.setState({stepIndex: this.state.stepIndex + 1, status: 1});
    };

    // function for Finished trip
    handleNextDone = () => {
        this.setState({stepIndex: this.state.stepIndex + 1, status: 2});
    };


    // function for Back button
    handlePrev = () => {
        if (this.state.stepIndex > 0) {
            this.setState({stepIndex: this.state.stepIndex - 1});
        }
    };

    renderStepActions(step) {
        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={'Create trip'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={this.state.stepIndex.stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {

        const stepIndex = this.state.stepIndex;

        if (!this.state.logged()){
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
                                        onClick={this.handleNextProgress}
                                        hoverColor='#E0F7FA'
                                    >
                                        <ListItem
                                            primaryText='Start new trip'
                                            leftIcon={<ProgressIcon color='black'/>}
                                            style={{backgroundColor: '#00BCD4', fontSize: 20}}
                                        />
                                        <CardText style={{fontSize: 16}}>
                                            When I choose option “Start new trip” on main page I
                                            should be
                                            redirected to page where I can name and describe trip.
                                            When I click “start” application gets my current
                                            position and adds it on a map as entry point of the
                                            trip. Now I can travel and add checkpoints on a map
                                            which other users can see, comment and like. Also I
                                            can share current trip on facebook. To end trip I must
                                            click stop
                                        </CardText>
                                    </ListItem>

                                    <ListItem
                                        onClick={this.handleNextAnnounce}
                                        hoverColor='#F9FBE7'
                                    >
                                        <ListItem
                                            primaryText='Announce future trip'
                                            leftIcon={<AnnounceIcon color='black'/>}
                                            style={{backgroundColor: '#CDDC39', fontSize: 20}}
                                        />
                                        <CardText style={{fontSize: 16}}>
                                            As a user, I want to have an opportunity to plan ahead
                                            trips. For this  I must click announce on main page and
                                            I will be redirected to page where I can add name,
                                            describe, set entry point, choose date, set it to
                                            private or public,  invite  friends from list and share
                                             on socials.The u click announce and when time will come
                                             you will receive notification that your trip is ready
                                        </CardText>

                                    </ListItem>

                                    <ListItem
                                        onClick={this.handleNextDone}
                                        hoverColor='#FFF8E1'
                                    >
                                        <ListItem
                                            primaryText='Load finished trip'
                                            leftIcon={<DoneIcon color='black'/>}
                                            style={{backgroundColor: '#FFC107', fontSize: 20}}
                                        />
                                        <CardText style={{fontSize: 16}}>
                                            As a user i want to have opportunity to grab photos
                                            that I took on trip directly from my instagram or other
                                            services and build map (trip) from that data. For this
                                            I must click ‘Load’ and proceed to page where I can
                                            choose which service use and time interval to load
                                            photos. Then i can add name and describe trip and click
                                            add to my trips, this will add trip to list of finished
                                            trips
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
                                <CreateAnnouncedTrip status={this.state.status}/>
                                {this.renderStepActions(1)}
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
            </div>
        );
    }
}
}
