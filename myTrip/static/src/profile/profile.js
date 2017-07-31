import React from "react";
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from './profile.less';


class TextBlock extends React.Component {
    constructor(){
    super();
    this.state = {
        email: 'random@gmail.com',
        name: '',
        surname: '',
        age: '',
        gender: '',
        hobbies:''
    };
    }
    render() {
        return(
            <div className='textBlock'>
                <h2>Email: {this.state.email}</h2>
                <h2>Name:{this.state.name}</h2>
                <h2>Surname:{this.state.surname}</h2>
                <h2>Age:{this.state.age}</h2>
                <h2>Gender:{this.state.gender}</h2>
                <h2>Hobbies:{this.state.hobbies}</h2>
            </div>
            );
    };
}


class Avatars extends React.Component {
    render(){
        return(
         <Avatar className='avatar' src="static/src/img/avatar_example.jpg" size={200} />
        );
    };

}

class Buttons extends React.Component {
  render() {
    return(
      <div className='divbutton'>
      <RaisedButton className='button' label="My Subscribers" primary={true} fullWidth={true}/>
      <RaisedButton className='button' label="My Friends" primary={true} fullWidth={true} />
      <RaisedButton className='button' label="My Trips" primary={true} fullWidth={true} />
      <RaisedButton className='button' label="Settings" primary={true} fullWidth={true} />
      <RaisedButton className='button' label="Edit Profile" primary={true} fullWidth={true} />
      </div>
      );
  };
}


export default class Profile extends React.Component {
  render(){
    return (
          <Paper className='MainPaper' zDepth={2} >
            <Avatars />
            <Buttons />
            <TextBlock />
          </Paper>
      );
  };
}