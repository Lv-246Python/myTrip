import React from "react";
import {Link} from 'react-router-dom'

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

import './profile.less';

const styles = {
  errorStyle: {
    color: blue500,
  },
  underlineStyle: {
    borderColor: blue500,
  },
  floatingLabelStyle: {
    color: blue500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

let response = {
    email: 'someemail@gmail.com',
    name: 'Adolf',
    surname: 'Gitler',
    age: '35',
    gender: 'male',
    hobbies: 'flexbox',
    avatar_src: 'static/src/img/avatar_example.jpg'
};


class TextBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            name: '',
            surname: '',
            age: '',
            gender: '',
            hobbies: '',
            avatar_src: ''
        };
    this.changeName = this.changeName.bind(this);

    };

    changeName(event) {
        this.setState({'name': event.target.value});
    };

    EditProfile(event){
        console.log(this.state.name)
    };




    render(){
        return(
      <div className='textBlock'>
        <TextField
          floatingLabelText="Email:"
          defaultValue={this.props.data.email}
          disabled={true}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabelStyle}
          hintStyle={styles.errorStyle}
        /><br />
        <TextField
          floatingLabelText="Name:"
          defaultValue={this.props.data.name}
          onChange={this.changeName}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabelStyle}
        /><br />
        <TextField
          floatingLabelText="Surname:"
          defaultValue={this.props.data.surname}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
        /><br />
        <TextField
          floatingLabelText="Age:"
          defaultValue={this.props.data.age}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.underlineStyle}
        /><br />
        <TextField
          floatingLabelText="Gender:"
          defaultValue={this.props.data.gender}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <TextField
          floatingLabelText="Hobbies:"
          defaultValue={this.props.data.hobbies}
          fullWidth={true}
          multiLine={true}
          rows={2}
          rowsMax={4}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <FlatButton onTouchTap={this.EditProfile} label="Edit profile" primary={true} fullWidth={true} />
      </div>
    );
};
}


class Avatars extends React.Component {
    render(){
        return(
         <Avatar className='avatar' src={this.props.data.avatar_src} size={200} />
        );
    };

}

class Buttons extends React.Component {
    clickEvent() {
        console.log('test')
    }
  render() {
    return(
      <div className='divbutton'>
          <RaisedButton  containerElement={<Link to='/mysubscriber'/>} 
          className='button' label="My Subscribers" 
          primary={true} fullWidth={true} style={{height: 75}} 
          />
          <RaisedButton containerElement={<Link to='/myfriends'/>}
          className='button' label="My Friends" 
          primary={true} fullWidth={true} style={{height: 75}} 
          />
          <RaisedButton containerElement={<Link to='/mytrips'/>}
          className='button' label="My Trips" 
          primary={true} fullWidth={true} style={{height: 75}} 
          />
          <RaisedButton containerElement={<Link to='/settings'/>}
          className='button' label="Settings" 
          primary={true} fullWidth={true} style={{height: 75}} 
          />
      </div>
      );
  };
}


export default class Profile extends React.Component {
  render(){
    return (
          <Paper className='MainPaper' zDepth={2} >
            <Avatars data={response}/>
            <TextBlock data={response} />
            <Buttons />
          </Paper>
      );
  };
}