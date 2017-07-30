import React from "react";
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';


const profile = {
    paper:{
        margin: 'auto',
        padding: 75,
        },
      avatar:{
       display:'block',
       marginLeft: '15%'
        },
      RaisedButton:{
      display:'block',
      marginLeft: '15%',
      width: 200,
      height: 75,
      marginTop: 25
      },
    text_block:{
      display: 'block',
      position: 'absolute',
      top: '25%',
      left: '35%',
      width: 600,
      height: 800,
      fontSize: "2.6em",
    }
   };

class Avatars extends React.Component {
    render(){
        return(
         <Avatar src="static/src/img/avatar_example.jpg" size={200} style={profile.avatar}/>
        );
    };

}

class Buttons extends React.Component {
  render() {
    return(
      <div className='buttons'>
      <RaisedButton label="My Subscribers" primary={true} style={profile.RaisedButton}/>
      <RaisedButton label="My Friends" primary={true} style={profile.RaisedButton}/>
      <RaisedButton label="My Trips" primary={true} style={profile.RaisedButton}/>
      <RaisedButton label="Settings" primary={true} style={profile.RaisedButton}/>
      <RaisedButton label="Edit Profile" primary={true} style={profile.RaisedButton}/>
      </div>
      );
  };
}

class TextBlock extends React.Component{
  constructor() {
    super();
    this.state = {email: "random@gmail.com",
                  name: "Petya",
                  surname: "Qwerty",
                  age: '30',
                  gender: 'Male',
                  hobbies: 'eata tea thoyetrk otds pytosk hyotsd hkptd hkosd pthkso pdthksp otht'
                }
  }





  render() {
    return (
      <div style={profile.text_block}>
      <p>Email:&nbsp;&nbsp;&nbsp;{this.state.email}</p>
      <p>Name:&nbsp;&nbsp;&nbsp;{this.state.name}</p>
      <p>Surname:&nbsp;&nbsp;&nbsp;{this.state.surname}</p>
      <p>Age:&nbsp;&nbsp;&nbsp;{this.state.age}</p>
      <p>Gender:&nbsp;&nbsp;&nbsp;{this.state.gender}</p>
      <p>Hobbies:&nbsp;&nbsp;&nbsp;{this.state.hobbies}</p>
      </div>
      );
  };
}


export default class Profile extends React.Component {
  render(){
    return (
      <Paper style={profile.paper} zDepth={2} >
          <TextBlock />
          <Avatars />
          <Buttons />
      </Paper>
      );
  };
}