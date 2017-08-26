import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { logged } from '../utils';
import { getData, postData } from'./subscribe.services';


const tripUrl = '/api/v1/trip/';
const profileUrl = 'api/v1/profile/';


export default class Subscribe extends React.Component {
    //Subscribe component shows who subscribed on trip or user and allows logged user to subscribe on.
    //ToDo: to open this component need to put handleOpen() and handleClose() to a parent's
    //component and set state 'open' at constructor, so that it can handle opening and closing.
    //Also need to send props like this: <RaisedButton label="Subscribes"
    // onClick={this.handleOpen} tripId={this.state.tripId} or profileId={this.state.profileId}
    // open={this.state.open}/>

    constructor(props) {
    super(props);
    this.state = {
        subscribes: [],
        open: false,
    };
    }

  renderData = () => {
    if (this.props.tripId){
    getData(tripUrl, this.props.tripId)
        .then(response => {
            this.setState({subscribes:response.data});

        });
    } else {
        getData(profileUrl, this.props.profileId)
        .then(response => {
            this.setState({subscribes:response.data});
        });
    }
};

  postSubscribeData= () =>{
      if (this.props.tripId){
        postData(tripUrl, this.props.tripId)
          .then(response => {
              this.renderData();
          });
    } else {
        postData(profileUrl, this.props.profileId)
        .then(response => {
           this.renderData();
        });
    }

  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
      this.renderData();
      console.log(this.props);
      console.log(this.state.subscribes)
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
      <span>{ (logged()) ?
      <FlatButton
        label="Subscribe"
        primary={true}
        keyboardFocused={true}
        onClick={this.postSubscribeData}
      />
        : false}</span>
    ];


    return (
      <div>
        <Dialog
          title="Subscribes"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <List>
               {this.state.subscribes.length >0 ?
                   (this.state.subscribes.map(subscribe => (
                    <ListItem key={subscribe.id}
                        primaryText={subscribe.user_name}
                        leftAvatar={<Avatar
                            //ToDo: add links to avatar from user's profile by id.
                            src="http://icons.veryicon.com/ico/Avatar/Halloween%20Avatars/slasher.ico"
                        />}>
                    </ListItem>)
                )):(<span>No subscribes</span>)
               }
          </List>
        </Dialog>
      </div>
    );
  }
}