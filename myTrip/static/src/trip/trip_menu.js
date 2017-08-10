import React from 'react';
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import EditDescriptionIcon from 'material-ui/svg-icons/editor/border-color';
import FlatButton from 'material-ui/FlatButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import TitleIcon from 'material-ui/svg-icons/editor/title';
import './trip.less'


export default class TripMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = props;
    };

    /*
    1       openDeleteTrip: false,
            disabledDelete: true,

    2       openEditTrip: false,
            disabledEdit: true,

    3       titleEdit: false,
            editTitleText: '',

    4       descriptionEdit: false,
            editDescriptionText: '',
    */

    //1 activate delete trip button for author
    handleOpenDeleteTrip = () => {
      this.setState({openDeleteTrip: true});
    };
    //1 deactivate delete trip button for user
    handleCloseDeleteTrip = () => {
      this.setState({disabledDelete: false});
    };


    //2 activate edit trip button for author
    handleOpenEditTrip = () => {
      this.setState({openEditTrip: true});
    };
    //2 deactivate edit trip button for user
    handleCloseEditTrip = () => {
      this.setState({disabledEdit: false});
    };


    //3 hide edit mode for title
    handleCloseEditTitle = () => {
      this.setState({titleEdit: false});
      this.setState({'disabled': true});
      this.setState({'editTitleText': tripTitle});
    };
    //3 edit trip title
    handleEditTitleText = (event) => {
        this.setState({'editTitleText': event.target.value});
        if (this.state.editTitleText.length !== 0) {
            this.setState({'disabled': false});
        };
    };


    //4 hide edit mode for description
    handleCloseEditDescription = () => {
      this.setState({descriptionEdit: false});
      this.setState({'disabled': true});
      this.setState({'editDescriptionText': tripDescription});
    };
    //4 edit trip description
    handleEditDescriptionText = (event) => {
        this.setState({'editDescriptionText': event.target.value});
        if (this.state.editDescriptionText.length !== 0) {
            this.setState({'disabled': false});
        };
    };


    // function for submit button for edit trip title text
    handleSubmitTripTitle = () => {
        putTripTitle(this.props.tripId, this.state.editTitleText)
            .then(() => {
                 this.props.getTrip();
                 this.setState({editTitleText: ''});
                 this.setState({titleEdit: false});
                 this.setState({'disabled': true});
            });
    };
    // function for submit button for edit trip description text
    handleSubmitTripDescription = () => {
        putTripDescription(this.props.tripId, this.state.editDescriptionText)
            .then(() => {
                 this.props.getTrip();
                 this.setState({editDescriptionText: ''});
                 this.setState({descriptionEdit: false});
                 this.setState({'disabled': true});
            });
    };
    // function for submit button for delete trip
    handleDeleteTrip = () => {
        this.props.deleteTrip(this.props.tripId)
            .then(() => this.props.getTrip());
    };


    render() {

        const trip = this.state.trip;

        const actionsEdit = [
          <FlatButton
            className='button-cancel-title-edit'
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCloseEditTitle}
          />,
          <FlatButton
            className='button-cancel-description-edit'
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCloseEditDescription}
          />,

          <FlatButton
            className='button-submit-title-edit'
            label="Submit"
            disabled={this.state.disabled}
            onTouchTap={this.handleSubmitTripTitle}
          />,
          <FlatButton
            className='button-submit-description-edit'
            label="Submit"
            disabled={this.state.disabled}
            onTouchTap={this.handleSubmitTripDescription}
          />,
        ];

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
            onTouchTap={this.handleDeleteTrip}
          />,
        ];


        return (

            <div className="HolyGrail-left">
              <List>
                <ListItem
                  className='buttonHome'
                  primaryText="Home"
                  leftIcon={<HomeIcon />}
                  containerElement={<Link to='/' />}/>

                <ListItem
                  className='buttonAllTrips'
                  primaryText="All trips"
                  leftIcon={<AllTripsIcon />}
                  containerElement={<Link to='/trips' />}/>

                <ListItem
                  className='buttonProfile'
                  primaryText="Profile"
                  leftIcon={<ProfileIcon />} />

                <ListItem
                  className='buttonEditTrip'
                  primaryText="Edit trip"
                  leftIcon={<EditIcon />}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={[

                      <ListItem
                        key={1}
                        className='buttonEditTitle'
                        primaryText="Edit title"
                        leftIcon={<TitleIcon />}
                      />,

                      <ListItem
                        key={2}
                        className='buttonEditDescription'
                        primaryText="Edit description"
                        leftIcon={<EditDescriptionIcon />}
                      />,
                  ]} />

                <ListItem
                  className='buttonDeleteTrip'
                  primaryText="Delete trip"
                  leftIcon={<DeleteIcon />} />

              </List>
            </div>
        );
    }
}
