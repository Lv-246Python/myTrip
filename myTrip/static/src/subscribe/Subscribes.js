import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


import { getUserOwnerData } from'./subscribe.services';


export default class Subscribes extends React.Component {
    //Subscribes component shows user's subscriptions
    //ToDo: Open this component and put handleOpen() and handleClose() to a parent's
    //component and set state 'open' at constructor, so that it can handle opening and closing.
    //Also need to send props like this: <RaisedButton label="Subscribes"
    // onClick={this.handleOpen} tripId={this.state.tripId} or profileId={this.state.profileId}
    // open={this.state.open}/>
    //

    constructor(props) {
    super(props);
    this.state = {
        subscribes: [],
        open: false,
    };
    }

  renderData = () => {
    getUserOwnerData()
        .then(response => {
            this.setState({subscribes:response.data});
        });
};

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
      this.renderData();

  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];


    return (
      <div>
          <RaisedButton onClick={this.handleOpen} label="subscribes"/>
        <Dialog
          title="You subscribed on"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <List>
           {this.state.subscribes.map(subscribe => (
               subscribe.trip ?
               (<ListItem key={subscribe.id}
                    primaryText="Trip"
                    secondaryText={
                        <span>{subscribe.trip_name}</span>
                    }
                    leftAvatar={<Avatar
                        //ToDo: add links to avatar from user's profile by id.
                        src="http://icons.veryicon.com/ico/Avatar/Halloween%20Avatars/slasher.ico"
                    />}>
                </ListItem>):
                   (<ListItem key={subscribe.id}
                    primaryText={subscribe.subscribed_on_name}
                    leftAvatar={<Avatar
                        //ToDo: add links to avatar from user's profile by id.
                        src="http://icons.veryicon.com/ico/Avatar/Halloween%20Avatars/slasher.ico"
                    />}>
                </ListItem>)
            ))}
          </List>
        </Dialog>
      </div>
    );
  }
}