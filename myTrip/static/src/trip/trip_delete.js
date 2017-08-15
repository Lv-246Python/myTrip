import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { ListItem } from 'material-ui/List';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import './trip.less'


export default class TripDelete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props: props,
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
            .then(() => this.getTrip());
    };


    //delete trip from backend by url with trip id
    deleteTrip = (tripId) => {
        axios.delete(`/api/v1/trip/${this.state.tripId}/`)
    };


    render() {

        const trip = this.state.trip;

        const actionsDelete = [
            <div className='buttonTripDialog'>
                <RaisedButton
                    label="Cancel"
                    labelPosition="before"
                    icon={<CancelIcon />}
                    primary={true}
                    onTouchTap={this.handleCloseDeleteTrip}
                />
                <RaisedButton
                    label="Delete"
                    labelPosition="before"
                    icon={<DeleteIcon />}
                    secondary={true}
                    disabled={this.state.disabled}
                    onTouchTap={this.deleteTrip}
                    containerElement={<Link to='/trips' />}
                />
            </div>
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
                    open={this.state.open}  //dialog invisible, until click delete

                    //after click on cancel or delete, dialog will be closed
                    onRequestClose={this.handleCloseDeleteTrip} />
            </div>
        );
    }
}
