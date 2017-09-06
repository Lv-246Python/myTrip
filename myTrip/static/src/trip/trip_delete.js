import React from 'react';
import axios from "axios";

import { ListItem } from 'material-ui/List';
import { deleteTrip } from './trip_service';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import './trip.less'


export default class TripDelete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tripId: this.props.tripId,
            open: false,
        };
    };


    // open delete trip dialog
    handleOpenDeleteTrip = () => {
        this.setState({open: true});
    };

    // close delete trip dialog
    handleCloseDeleteTrip = () => {
        this.setState({open: false});
    };

    // function for submit button for delete trip
    handleDeleteTrip = () => {
        this.deleteTrip(this.state.tripId)
    };

    //delete trip from backend by url with trip id
    deleteTrip = (tripId) => {
        deleteTrip(this.props.tripId)
        .then(() => this.props.history.push('/my_trips'));
    };


    render() {

        const trip = this.state.trip;

        const actionsDelete = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    label='Cancel'
                    labelPosition='before'
                    icon={<CancelIcon />}
                    primary={true}
                    onTouchTap={this.handleCloseDeleteTrip}
                />
                <RaisedButton
                    label='Delete'
                    labelPosition='before'
                    icon={<DeleteIcon />}
                    secondary={true}
                    disabled={this.state.disabled}
                    onTouchTap={this.deleteTrip}
                />
            </div>
        ];


        return (
            <div>
                <Divider />
                <ListItem
                    key='delete'
                    className='buttonDeleteTrip'
                    primaryText='Delete trip'
                    onTouchTap={this.handleOpenDeleteTrip}
                    leftIcon={<DeleteIcon />} />

                <Dialog
                    title='Do you really want to delete trip?'
                    actions={actionsDelete} //add cancel and delete buttons to delete dialog
                    open={this.state.open}  //dialog invisible, until click delete

                    //exit from dialog via Esc or side-click
                    onRequestClose={this.handleCloseDeleteTrip}
                />
            </div>
        );
    }
}
