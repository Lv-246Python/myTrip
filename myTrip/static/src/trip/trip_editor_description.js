import React from 'react';
import axios from "axios";

import { editTrip } from './trip_service';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import SubmitIcon from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import './trip.less'


export default class TripEditorDescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            disabled: true,
            newText: '',
            tripId: this.props.tripId,
        };
    };

    // open edit trip dialog with description from props
    handleOpenEditTrip = () => {
        this.setState({open: true});
        this.setState({newText: this.props.text});
    };

    // function for edit description text, that cannot be the same or empty
    handleEditTripText = (event) => {
        this.setState({newText: event.target.value});
        if ((event.target.value === this.props.text) || (event.target.value.trim().length === 0)){
            this.setState({disabled: true});
        } else {
            this.setState({disabled: false});
        };
    };

    /*
    function for submit button for edit trip description
    create params with new description and default title and status
    create putTrip func
    call this func that takes that params and put them by trip id
    call get func from props and rerender page
    close edit dialog
    */
    editTrip = () => {
        const description = this.state.newText;
        const putTrip = (description) => {
            return axios.put(`/api/v1/trip/${this.state.tripId}/`, {description})
        };
        putTrip(description).then(() => {
            this.props.getTrip();
            this.handleCloseEditTrip()
        })
    };

    // close edit trip dialog
    handleCloseEditTrip = () => {
        this.setState({open: false});
        this.setState({disabled: true});
    };


    render() {

        {/*
        create cancel and submit buttons for edit dialog
        */}
        const actionsEdit = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    className='button-submit-edit-trip'
                    label='Submit'
                    labelPosition='before'
                    icon={<SubmitIcon />}
                    primary={true}
                    disabled={this.state.disabled}
                    onTouchTap={this.editTrip}
                />
                <RaisedButton
                    className='button-cancel-trip-edit'
                    label='Cancel'
                    labelPosition='before'
                    icon={<CancelIcon />}
                    secondary={true}
                    onTouchTap={this.handleCloseEditTrip}
                />
            </div>
        ];

        return (

            <div>
                <IconButton // click -> open edit dialog with description text and 2 buttons
                    key='edit'
                    className='buttonEditTrip'
                    onTouchTap={this.handleOpenEditTrip}
                    tooltip='EDIT DESCRIPTION'
                    tooltipPosition='top-center'
                >
                    <EditIcon />
                </IconButton>

                <Dialog
                    title='Edit trip description'
                    actions={actionsEdit} //add cancel and edit buttons to edit dialog
                    open={this.state.open}  //dialog invisible, until click edit icon
                >
                    <TextField
                        autoFocus
                        name='trip description'
                        fullWidth={true}
                        multiLine={true}
                        rowsMax={25}
                        value={this.state.newText} //take text from handleEditTripText
                        onChange={this.handleEditTripText}
                    />
                </Dialog>
            </div>
        );
    }
}
