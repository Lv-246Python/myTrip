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
    function for submit button for change trip status
    add new status to state
    create params with new status and default title and description
    create putTrip func
    call this func that takes that params and put them by trip id
    call get func from props and rerender page
    close edit dialog
    */
    editStatus = (x) => {
        this.setState({status: x});
        const title = this.props.trip.title;
        const description = this.props.trip.description;
        const status = this.state.status;

        const putTrip = (title, description, status) => {
            return axios.put(`/api/v1/trip/${this.props.trip.id}/`, {
                title, description, status })
        };
        putTrip(title, description, status)
        .then(() => {
            this.props.getTrip();
            this.handleCloseEditStatus()
        })
    };


    render() {

        const tripStatus = this.state.status;


        {/*
        create cancel and submit buttons for status change dialog
        */}
        const actionsEditAnnounced = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    className='button-submit-change-status'
                    label='Start trip'
                    labelPosition='before'
                    icon={<ProgressIcon />}
                    primary={true}
                    onTouchTap={() => this.editStatus(0)}
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
        create cancel and submit buttons for status change dialog
        */}
        const actionsEditProgress = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    className='button-submit-change-status'
                    label='Finish trip'
                    labelPosition='before'
                    icon={<DoneIcon />}
                    primary={true}
                    onTouchTap={() => this.editStatus(2)}
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

        if (tripStatus === 0){
            return(
                <div className='tripStatusLine'>
                    <div className='tripStatus'>
                        <ProgressIcon style={{paddingRight: '8px'}} />
                        In progress
                    </div>

                    {/*
                    If user is author of trip, render Finish button
                    */}
                    {(userId() === this.props.trip.user) ?
                    <div className='statusButton'>

                        <FlatButton
                            label='Finish trip'
                            primary={true}
                            onTouchTap={this.handleOpenEditStatus}
                        />

                    </div> : false}

                    <Dialog
                        title='Do you really want to finish this trip?'
                        actions={actionsEditProgress} //add cancel and edit buttons to edit dialog
                        open={this.state.open}  //dialog invisible, until click edit button
                    >

                    </Dialog>
                </div>
            )
        } else if (tripStatus === 1){
            return(
                <div className='tripStatusLine'>
                    <div className='tripStatus'>
                        <AnnounceIcon style={{paddingRight: '8px'}} />
                        Announced trip
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
                        title='Do you really want to start this trip?'
                        actions={actionsEditAnnounced} //add cancel and edit buttons to edit dialog
                        open={this.state.open}  //dialog invisible, until click edit button
                    >

                    </Dialog>
                </div>
            )
        } else if (tripStatus === 2){
            return(
                <div className='tripStatusLine'>
                    <div className='tripStatus'>
                        <DoneIcon style={{paddingRight: '8px', paddingBottom: '8px'}} />
                        Finished trip
                    </div>
                </div>
            )
        }
    }
}
