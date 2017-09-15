import React from 'react';
import axios from "axios";

import { Card, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { userId } from '../utils';
import AnnounceIcon from 'material-ui/svg-icons/action/today';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import DoneIcon from 'material-ui/svg-icons/toggle/check-box';
import FlatButton from 'material-ui/FlatButton';
import ProgressIcon from 'material-ui/svg-icons/action/trending-up';
import RaisedButton from 'material-ui/RaisedButton';

import './trip.less';

let startDateText = `
Do you really want to start this trip?
It will change Start date to current date.
`

let finishDateText = `
Do you really want to finish this trip?
It will add Finish date with current date.
`

export default class TripStatus extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status: this.props.status,
            trip: this.props.trip,
            open: false,
        };
    };

    //function for open change status dialog after click button start/finish
    handleOpenEditStatus = () => {
        this.setState({open: true});
    }
    //function for close change status dialog after click button cancel/submit
    handleCloseEditStatus = () => {
        this.setState({open: false});
    }

    /*
    function for submit button for change trip status and start date
    add new status and start date to state
    create params with new status and start date
    create putTrip func
    call this func that takes that params and put them by trip id
    call get func from props and rerender page
    close edit dialog
    */
    editAnnouncedStatus = () => {
        this.setState({status: 2});
        const status = 2;
        const start = new Date()

        const putTrip = (status, start) => {
            return axios.put(`/api/v1/trip/${this.props.trip.id}/`, {status, start})};
        putTrip(status, start).then(() => {
            this.props.getTrip();
            this.handleCloseEditStatus();
        })
    };

    /*
    function for submit button for change trip status and finish date
    add new status and finish date to state
    create params with new status and finish date
    create putTrip func
    call this func that takes that params and put them by trip id
    call get func from props and rerender page
    close edit dialog
    */
    editInProgressStatus = () => {
        this.setState({status: 1});
        const status = 1;
        const finish = new Date();

        const putTrip = (status, finish) => {
            return axios.put(`/api/v1/trip/${this.props.trip.id}/`, {status, finish})};
        putTrip(status, finish).then(() => {
            this.props.getTrip();
            this.handleCloseEditStatus();
        })
    };


    render() {

        const tripStatus = this.state.status;

        {/*
        create cancel and submit buttons for status change dialog from announced to in progress
        */}
        const actionsEditAnnounced = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    className='button-submit-change-status'
                    label='Start trip'
                    labelPosition='before'
                    icon={<ProgressIcon />}
                    primary={true}
                    onTouchTap={this.editAnnouncedStatus}
                />
                <RaisedButton
                    className='button-cancel-change-status'
                    label='Cancel'
                    labelPosition='before'
                    icon={<CancelIcon />}
                    secondary={true}
                    onTouchTap={this.handleCloseEditStatus}
                />
            </div>
        ];

        {/*
        create cancel and submit buttons for status change dialog from in progress to finished
        */}
        const actionsEditProgress = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    className='button-submit-change-status'
                    label='Finish trip'
                    labelPosition='before'
                    icon={<DoneIcon />}
                    primary={true}
                    onTouchTap={this.editInProgressStatus}
                />
                <RaisedButton
                    className='button-cancel-change-status'
                    label='Cancel'
                    labelPosition='before'
                    icon={<CancelIcon />}
                    secondary={true}
                    onTouchTap={this.handleCloseEditStatus}
                />
            </div>
        ];

        if (tripStatus === 3){
            return(
                <div className='tripStatusLine'>
                    <div className='tripStatus'>
                        <div className='statusType'>Announced trip</div>
                        <AnnounceIcon />
                    </div>

                    {/*
                    If user is author of trip, render Start button
                    */}
                    {(userId() === this.props.trip.user) ?
                    <div className='statusButton'>

                        <FlatButton
                            label='Start trip'
                            primary={true}
                            onTouchTap={this.handleOpenEditStatus}
                        />

                    </div> : false}

                    <Dialog
                        title={startDateText}
                        actions={actionsEditAnnounced} //add cancel and edit buttons to edit dialog
                        open={this.state.open}  //dialog invisible, until click start trip button
                    >

                    </Dialog>
                </div>
            )
        } else if (tripStatus === 2){
            return(
                <div className='tripStatusLine'>
                    <div className='tripStatus'>
                        <div className='statusType'>In progress</div>
                        <ProgressIcon />
                    </div>

                    {/*
                    If user is author of trip, render Finish button
                    */}
                    {(userId() === this.props.trip.user) ?
                    <div className='statusButton'>

                        <FlatButton
                            label='Finish trip'
                            secondary={true}
                            onTouchTap={this.handleOpenEditStatus}
                        />

                    </div> : false}

                    <Dialog
                        title={finishDateText}
                        actions={actionsEditProgress} //add cancel and edit buttons to edit dialog
                        open={this.state.open}  //dialog invisible, until click finish trip button
                    >

                    </Dialog>
                </div>
            )
        } else if (tripStatus === 1){
            return(
                <div className='tripStatusLine'>
                    <div className='tripStatus'>
                        <div className='statusType'>Finished trip</div>
                        <DoneIcon/>
                    </div>
                </div>
            )
        }
    }
}
