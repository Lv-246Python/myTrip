import React from 'react';
import axios from "axios";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import DoneIcon from 'material-ui/svg-icons/toggle/check-box';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class CreateFinishedTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titleIsEmpty: true,
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

    // function for edit description text, that can be empty
    handleDescriptionField = (event) => {
        this.setState({description: event.target.value.trim()});
    };

    // function for edit title text, that cannot be empty
    handleStartField = () => {
        if (this.state.startDate === 0){
            this.setState({startDateIsEmpty: true});
        } else {
            this.setState({startDateIsEmpty: false});
        };
    };

    handleStartDate = (event, date) => {
        this.setState({startDate: date});
        this.setState({finishDate: date})
        this.setState({startDateIsEmpty: false});
    };

    handleFinishDate = (event, date) => {
        this.setState({finishDate: date})
        this.setState({finishDateIsEmpty: false});
    };


    // function for create trip with title, description and status
    handleCreateTrip = () => {
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        const start = this.state.startDate;
        const finish = this.state.finishDate;
        const createTrip = (title, description, status, start, finish) => {
            return axios.post(`/api/v1/trip/`, {
                title, description, status, start, finish })
        };
        createTrip(title, description, status, start, finish)
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
                            <CardText>
                                <div className='required'>
                                    <div>Add name of your trip</div>
                                    <div className='redStar'>*</div>
                                </div>
                            </CardText>
                            <TextField
                                name='trip title'
                                hintText='Trip title'
                                autoFocus
                                style={{paddingLeft: 16}}
                                value={this.state.title}
                                onChange={this.handleTitleField}
                            />
                        {/*Description*/}
                            <CardText>
                                <div className='required'>
                                    <div>Add description of your trip</div>
                                </div>
                            </CardText>
                            <TextField
                                name='trip description'
                                hintText='You can add it later'
                                fullWidth={true}
                                multiLine={true}
                                rowsMax={10}
                                style={{paddingLeft: 16, width:'90%'}}
                                value={this.state.description}
                                onChange={this.handleDescriptionField}
                            />
                        {/*Start*/}
                            <CardText>
                                <div className='required'>
                                    <div>Indicate the start date of your trip</div>
                                    <div className='redStar'>*</div>
                                </div>
                            </CardText>
                            <DatePicker
                                hintText="Start trip date"
                                mode="landscape"
                                maxDate={new Date()}
                                openToYearSelection={true}
                                style={{paddingLeft: 16}}
                                value={this.state.startDate}
                                onChange={this.handleStartDate}
                            />
                        {/*Finish*/}
                            <CardText>
                                <div className='required'>
                                    <div>Indicate the finish date of your trip</div>
                                    <div className='redStar'>*</div>
                                </div>
                            </CardText>
                            <DatePicker
                                hintText="Finish trip date"
                                mode="landscape"
                                minDate={this.state.startDate}
                                maxDate={new Date()}
                                value={this.state.finishDate}
                                onChange={this.handleFinishDate}
                                style={{marginBottom: 50, paddingLeft: 16}}
                            />
                    </div>

                    <div className='newTripMap'>
                        <Card>
                            {/*
                            there will be Google Map component
                            */}

                            <CardMedia className='tripGoogleMap'>
                                <img src='/static/src/img/nice_pic_finished.jpg' />
                            </CardMedia>
                        </Card>
                    </div>
                </div>
                <RaisedButton
                    label={'Create finished trip'}
                    labelPosition='before'
                    icon={<DoneIcon />}
                    backgroundColor='#FFC107'
                    onClick={this.handleCreateTrip}
                    style={{marginBottom: 16}}
                    disabled={this.state.titleIsEmpty||this.state.startDateIsEmpty||this.state.finishDateIsEmpty}
                />
            </Card>
        );
    }
}
