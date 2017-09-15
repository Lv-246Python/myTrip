import React from 'react';
import axios from "axios";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import ProgressIcon from 'material-ui/svg-icons/action/trending-up';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class CreateNewTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titleIsEmpty: true,
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
        this.setState({description: event.target.value.trim()});
    };


    // function for create trip with title, description and status
    handleCreateTrip = () => {
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        const start = new Date();
        const createTrip = (title, description, status, start) => {
            return axios.post(`/api/v1/trip/`, {
                title, description, status, start })
        };
        createTrip(title, description, status, start)
        .then(response => {
            const tripId = response.data.id;
            this.props.history.push(`/trip/${tripId}`);
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
                                    <p>*</p>
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
                    label={'Start new trip'}
                    labelPosition='before'
                    icon={<ProgressIcon />}
                    backgroundColor='#CDDC39'
                    onClick={this.handleCreateTrip}
                    style={{marginBottom: 16}}
                    disabled={this.state.titleIsEmpty}
                />
            </Card>
        );
    }
}
