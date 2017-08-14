import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './trip.less'


export default class TripMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props: props,
            tripId: this.props.trip.id,
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
            .then(() => this.getTrip());
    };


    //delete trip from backend by url with trip id
    deleteTrip = (tripId) => {
        axios.delete(`/api/v1/trip/${this.state.tripId}/`)
    };


    render() {

        const trip = this.state.trip;

        const actionsDelete = [
            <FlatButton
                className='button-cancel-trip-delete'
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleCloseDeleteTrip}
            />,
            <FlatButton
                className='button-delete-trip'
                label="Delete"
                disabled={this.state.disabled}
                onTouchTap={this.deleteTrip}
                containerElement={<Link to='/trips' />}
            />,
        ];


        return (

            <div>
                <ListItem
                    key='delete'
                    className='buttonDeleteTrip'
                    primaryText="Delete trip"
                    onTouchTap={this.handleOpenDeleteTrip}
                    leftIcon={<DeleteIcon />} />

                <Dialog
                    title="Do you really want to delete trip?"
                    actions={actionsDelete} //add cancel and delete buttons to delete dialog
                    modal={false}           //exit from dialog via Esc or side-click
                    open={this.state.open}  //dialog invisible, until click delete

                    //after click on cancel or delete, dialog will be closed
                    onRequestClose={this.handleCloseDeleteTrip} />
            </div>
        );
    }
}
