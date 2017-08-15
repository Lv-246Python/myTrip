import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import CancelIcon from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import EditIcon from 'material-ui/svg-icons/image/edit';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SubmitIcon from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import './trip.less'


export default class TripEditorTitle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props: props,
            tripId: this.props.trip.id,
            open: false,
            disabled: true,
            editTripText: this.props.trip.title
        };
        console.log(this.props.trip.id)
    };


    // open edit trip dialog
    handleOpenEditTrip = () => {
      this.setState({open: true});
      this.setState({editTitleText: this.props.trip.title});
      console.log(this.props.trip.title)
    };

    // close edit trip dialog
    handleCloseEditTrip = () => {
      this.setState({open: false});
      this.setState({disabled: true});
      this.setState({editTitleText: ''});
    };


    handleEditTripText = (event) => {
        this.setState({'editTripText': event.target.value});
        if (this.state.editTripText.length !== 0) {
            this.setState({disabled: false});
        };
        console.log(this.state.editTripText)
    };


    //get trip data from backend by url with trip id
    getTrip = () => {
        axios.get(`/api/v1/trip/${this.state.tripId}/`).then(response => {
            const trip = response.data;
            this.setState({trip: trip});
        });
        console.log(this.state.tripId);
    };


    // function for submit button for edit trip
    editTrip = () => {
        const title = this.state.title;
        const description = this.state.description;
        const status = 0;
        const putTrip = (title, description, status) => {
            return axios.put(`/api/v1/trip/${this.props.tripId}/`, {
                title,
                description,
                status
            }).then(this.getTrip());
        console.log('Edit');
        }
    };


    render() {

        const trip = this.state.trip;
        const value = this.state.title;

        const actionsEdit = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    className='button-submit-edit-trip'
                    label="Submit"
                    labelPosition="before"
                    icon={<SubmitIcon />}
                    primary={true}
                    disabled={this.state.disabled}
                    onTouchTap={this.editTrip}
                />
                <RaisedButton
                    className='button-cancel-trip-edit'
                    label="Cancel"
                    labelPosition="before"
                    icon={<CancelIcon />}
                    secondary={true}
                    onTouchTap={this.handleCloseEditTrip}
                />
            </div>
        ];


        return (

            <div>
                <IconButton
                    key='edit'
                    className='buttonEditTrip'
                    onTouchTap={this.handleOpenEditTrip}
                    tooltip="EDIT TITLE"
                    tooltipPosition="top-center"
                >
                    <EditIcon />
                </IconButton>

                <Dialog
                    title="Edit trip title"
                    actions={actionsEdit} //add cancel and edit buttons to edit dialog
                    modal={true}           //close exit from dialog via Esc or side-click
                    open={this.state.open}  //dialog invisible, until click edit

                    //after click on cancel or submit, dialog will be closed
                    onRequestClose={this.handleCloseEditTrip} >

                        <TextField
                            autoFocus
                            name='trip title'
                            fullWidth={true}
                            value={this.state.editTripText}
                            onChange={this.handleEditTripText} />
                </Dialog>

            </div>
        );
    }
}
