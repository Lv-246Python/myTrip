import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import {blue900, blue500 } from 'material-ui/styles/colors';
import './profile.less';

const styles = {
  floatingLabelStyle: {
    color: blue500,
  },
};

// hardcoded response
let resp = {
    email: 'someemail@gmail.com',
    name: 'Alber',
    surname: 'Unter',
    age: '35',
    gender: 'male',
    hobbies: '',
    avatar_src: 'static/src/img/avatar_example.jpg'
};


class TextBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = props.data;
        this.state.z = {}

    };

    getProfile = () => {
    return axios.get('/api/v1/profile/')
    .then(response => this.setState({z: response.data}))
    .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getProfile()
    }

    onChange = (event, newValue) => {
        this.setState({[event.target.name]: newValue});
    };

    putProfile = (name, surname, age, gender, hobbies) => {
        return axios.put('/api/v1/profile/', {
            name,
            surname,
            age,
            gender,
            hobbies
        })
    }


    profileEdit = (event) => {
        const name = this.state.name;
        const surname = this.state.surname;
        const age = this.state.age;
        const gender = this.state.gender;
        const hobbies = this.state.hobbies;
        this.putProfile(
            name,
            surname,
            age,
            gender,
            hobbies
            )
        console.log(name,surname,age,gender,hobbies)
    }

    render(){
        return(
      <div className='textBlock'>
        <TextField
          floatingLabelText="Email:"
          value={this.state.email}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabelStyle}
        /><br />
        <TextField
          floatingLabelText="Name:"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabelStyle}
        /><br />
        <TextField
          floatingLabelText="Surname:"
          defaultValue={this.state.surname}
          fullWidth={true}
          name="surname"
          onChange={this.onChange}
          floatingLabelStyle={styles.floatingLabelStyle}
        /><br />
        <TextField
          floatingLabelText="Age:"
          defaultValue={this.state.age}
          fullWidth={true}
          name='age'
          onChange={this.onChange}
          floatingLabelStyle={styles.floatingLabelStyle}
        /><br />
        <TextField
          floatingLabelText="Gender:"
          defaultValue={this.state.gender}
          fullWidth={true}
          name='gender'
          onChange={this.onChange}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <TextField
          floatingLabelText="Hobbies:"
          defaultValue={this.state.hobbies}
          fullWidth={true}
          name='hobbies'
          multiLine={true}
          onChange={this.onChange}
          rows={2}
          rowsMax={5}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <FlatButton onTouchTap={this.profileEdit} 
        label="Edit profile" primary={true} fullWidth={true} 
        rippleColor={blue900} />
      </div>
    );
};
}


class Avatars extends React.Component {
    render(){
        return(
         <Avatar className='avatar' onClick={console.log('hello')} src={this.props.data.avatar_src} size={200}
          />
        );
    };

}

class Buttons extends React.Component {
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
            <Avatars data={resp}/>
            <TextBlock data={resp} />
            <Buttons />
          </Paper>
      );
  };
}