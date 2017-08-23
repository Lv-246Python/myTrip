import React from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class CreateAnnouncedTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            status: this.props.status
        }
    };


    render() {
        return (
            <div className='announcedTrip'>
                <div className='announcedTripContent'>
                    <Card>
                        <CardTitle
                            title='Add name of your trip'
                            style={{
                                fontSize: 20,
                                width: '70%',
                                marginBottom: 20,
                            }}
                        />
                        <TextField name='trip title' autoFocus>
                        </TextField>


                        <CardTitle
                            title='Add description of your trip'
                            style={{
                                backgroundColor: '#E0F7FA',
                                fontSize: 20,
                                width: '70%',
                                marginBottom: 20,
                                marginTop: 50,
                            }}
                        />
                            <TextField name='trip description'>
                            </TextField>
                    </Card>
                </div>

                <div className='announcedTripMap'>
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
        );
    }
}