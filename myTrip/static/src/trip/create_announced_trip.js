import React from 'react';
import axios from "axios";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AnnounceIcon from 'material-ui/svg-icons/action/today';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class CreateAnnouncedTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titleIsEmpty: true,
            descriptionIsEmpty: true,
            startDateIsEmpty: true,
            finishDateIsEmpty: true,
            title: '',
            description: '',
            status: this.props.status,
            startDate: null,
            finishDate: null,
        }
    };

    // function for edit title text, that cannot be empty
    handleTitleField = (event) => {
        this.setState({title: event.target.value});
        if (event.target.value.trim().length === 0){
            this.setState({titleIsEmpty: true});
        } else {
            this.setState({titleIsEmpty: false});
        };
    };

    // function for edit description text, that cannot be empty
    handleDescriptionField = (event) => {
        this.setState({description: event.target.value});
        if (event.target.value.trim().length === 0){
            this.setState({descriptionIsEmpty: true});
        } else {
            this.setState({descriptionIsEmpty: false});
        };
    };

    handleStartDate = (event, date) => {
        this.setState({startDate: date});
        this.setState({finishDate: date});
        this.setState({startDateIsEmpty: false});
    };

    handleFinishDate = (event, date) => {
        this.setState({finishDate: date})
        this.setState({finishDateIsEmpty: false});
    };

    // function for create trip with title, description and status, and redirect to trip page
    handleCreateTrip = () => {
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        const createTrip = (title, description, status) => {
            return axios.post(`/api/v1/trip/`, {
                title, description, status })
        };
        createTrip(title, description, status)
        .then(response => {
            const tripId = response.data.id;
            this.props.history.push(`/trip/${tripId}`)
        })
    };


    render() {
        return (
            <Card>
                <div className='newTrip'>
                    <div className='newTripContent'>
                        {/*Title*/}
                            <CardTitle
                                title='Add name of your trip'
                                style={{
                                    fontSize: 12,
                                    width:'95%'
                                }}
                            />
                            <TextField
                                name='trip title'
                                autoFocus
                                value={this.state.title}
                                onChange={this.handleTitleField}
                            />
                        {/*Description*/}
                            <CardTitle
                                title='Add description of your trip'
                                style={{fontSize: 12, }}
                            />
                            <TextField
                                name='trip description'
                                fullWidth={true}
                                multiLine={true}
                                rowsMax={10}
                                style={{width:'95%'}}
                                value={this.state.description}
                                onChange={this.handleDescriptionField}
                            />
                        {/*Start*/}
                            <CardTitle
                                title='Indicate the start date of your trip'
                                style={{
                                    fontSize: 12,
                                    width:'95%'
                                }}
                            />
                            <DatePicker
                                hintText="Start trip date"
                                mode="landscape"
                                minDate={new Date()}
                                openToYearSelection={true}
                                value={this.state.startDate}
                                onChange={this.handleStartDate}
                            />
                        {/*Finish*/}
                            <CardTitle
                                title='Indicate the finish date of your trip'
                                style={{fontSize: 12, }}
                            />
                            <DatePicker
                                hintText="Finish trip date"
                                mode="landscape"
                                minDate={this.state.startDate}
                                value={this.state.finishDate}
                                onChange={this.handleFinishDate}
                                style={{marginBottom: 50, }}
                            />
                    </div>

                    <div className='newTripMap'>
                        <Card>
                            {/*
                            there will be Google Map component
                            */}

                            <CardMedia className='tripGoogleMap'>
                                <img src='/static/src/img/nice_pic.jpg' />
                            </CardMedia>
                        </Card>
                    </div>
                </div>
                <RaisedButton
                    label={'Create announced trip'}
                    labelPosition='before'
                    icon={<AnnounceIcon />}
                    backgroundColor='#CDDC39'
                    onClick={this.handleCreateTrip}
                    style={{marginBottom: 16}}
                    disabled={this.state.titleIsEmpty||this.state.descriptionIsEmpty||this.state.startDateIsEmpty||this.state.finishDateIsEmpty}
                />
            </Card>
        );
    }
}
