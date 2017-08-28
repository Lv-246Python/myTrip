import React from 'react';
import axios from "axios";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import DoneIcon from 'material-ui/svg-icons/toggle/check-box';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class CreateFinishedTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titleIsEmpty: true,
            descriptionIsEmpty: true,
            title: '',
            description: '',
            status: this.props.status
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


    // function for create trip with title, description and status
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
                                style={{
                                    fontSize: 12,
                                }}
                            />
                            <TextField
                                name='trip description'
                                fullWidth={true}
                                multiLine={true}
                                rowsMax={10}
                                style={{
                                    width:'95%'
                                }}
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
                            />
                        {/*Finish*/}
                            <CardTitle
                                title='Indicate the finish date of your trip'
                                style={{
                                    fontSize: 12,
                                }}
                            />
                            <DatePicker
                                hintText="Finish trip date"
                                mode="landscape"
                                style={{
                                    marginBottom: 50,
                                }}
                            />
                    </div>

                    <div className='newTripMap'>
                        <Card>
                            {/*
                            there will be Google Map component
                            */}

                            <CardMedia className='tripGoogleMap'>
                                <img src='/static/src/img/world_map.jpg' />
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
                    disabled={this.state.titleIsEmpty||this.state.descriptionIsEmpty}
                />
            </Card>
        );
    }
}
