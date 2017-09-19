import React from 'react';
import axios from "axios";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { userId } from '../utils';
import AnnounceIcon from 'material-ui/svg-icons/action/today';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import moment from 'moment';


export default class TripDate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            finishDate: this.props.trip.finish,
            startDate: this.props.trip.start,
            status: this.props.status,
        }
    };

    // function for edit start trip date with handle finish trip date
    handleStartDate = (event, date) => {
        this.setState({startDate: date});
        const start = date;
        const finish = date;

        const putTrip = (start, finish) => {
            return axios.put(`/api/v1/trip/${this.props.trip.id}/`, {start, finish})};
        putTrip(start, finish).then(() => {
            this.props.getTrip();
        })
    };

    // function for edit finish trip date
    handleFinishDate = (event, date) => {
        this.setState({finishDate: date});
        const finish = date;

        const putTrip = (finish) => {
            return axios.put(`/api/v1/trip/${this.props.trip.id}/`, {finish})};
        putTrip(finish).then(() => {
            this.props.getTrip();
        })
    };

    //this function update children state, if father props was changed
    componentWillReceiveProps = (nextProps) => {
        this.setState({finishDate: nextProps.trip.finish});
        this.setState({startDate: nextProps.trip.start});
    }


    render() {
        return (
            <div className='tripStatus'>
                {/*Announced trip*/}
                {(this.props.status == 3) ?
                (// Start Date
                <div>
                    <div className='tripStatusLine'>
                        <div className='statusType'>Start:</div>
                        {(userId() === this.props.trip.user) ?
                        <DatePicker
                            name='Start'
                            mode="landscape"
                            minDate={new Date()}
                            openToYearSelection={true}
                            onChange={this.handleStartDate}
                            value={this.state.startDate}
                            textFieldStyle={{maxWidth: 80}}
                        /> :
                        <TextField
                            name='Start'
                            value={moment(this.state.startDate).format('YYYY-MM-DD')}
                            underlineShow={false}
                        />}
                    </div>
                    {/*Finish Date*/}
                    <div className='tripStatusLine'>
                        <div className='statusType'>Finish:</div>
                        {(userId() === this.props.trip.user) ?
                        <DatePicker
                            name='Finish'
                            mode="landscape"
                            minDate={this.state.startDate}
                            onChange={this.handleFinishDate}
                            value={this.state.finishDate}
                            textFieldStyle={{maxWidth: 80}}
                        /> :
                        <TextField
                            name='Finish'
                            value={moment(this.state.finishDate).format('YYYY-MM-DD')}
                            underlineShow={false}
                        />}
                    </div>
                </div>
                ) : false}

                {/*In progress*/}
                {(this.props.status == 2) ?
                //Start Date
                <div className='tripStatusLine'>
                    <div className='statusType'>Start:</div>
                    {(userId() === this.props.trip.user) ?
                    <DatePicker
                        name='Start'
                        mode="landscape"
                        maxDate={new Date()}
                        openToYearSelection={true}
                        onChange={this.handleStartDate}
                        value={this.state.startDate}
                        textFieldStyle={{maxWidth: 80}}
                    /> :
                    <TextField
                        name='Start'
                        value={moment(this.state.startDate).format('YYYY-MM-DD')}
                        underlineShow={false}
                    />}
                </div>
                : false}

                {/*Finished trip*/}
                {(this.props.status == 1) ?
                (// Start Date
                <div>
                    <div className='tripStatusLine'>
                        <div className='statusType'>Start:</div>
                        {(userId() === this.props.trip.user) ?
                        <DatePicker
                            name='Start'
                            mode="landscape"
                            openToYearSelection={true}
                            maxDate={new Date()}
                            onChange={this.handleStartDate}
                            value={this.state.startDate}
                            textFieldStyle={{maxWidth: 80}}
                        /> :
                        <TextField
                            name='Start'
                            value={moment(this.state.startDate).format('YYYY-MM-DD')}
                            underlineShow={false}
                        />}
                    </div>
                    {/*Finish Date*/}
                    <div className='tripStatusLine'>
                        <div className='statusType'>Finish:</div>
                        {(userId() === this.props.trip.user) ?
                        <DatePicker
                            name='Finish'
                            mode="landscape"
                            minDate={this.state.startDate}
                            maxDate={new Date()}
                            onChange={this.handleFinishDate}
                            value={this.state.finishDate}
                            textFieldStyle={{maxWidth: 80}}
                        /> :
                        <TextField
                            name='Finish'
                            value={moment(this.state.finishDate).format('YYYY-MM-DD')}
                            underlineShow={false}
                        />}
                    </div>
                </div>
                ) : false}
            </div>
        );
    }
}
