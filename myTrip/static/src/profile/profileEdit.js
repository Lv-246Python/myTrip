import React from "react";
import axios from "axios";

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import { blue500 } from 'material-ui/styles/colors';

import './profile.less';
import { styles } from './profile.style.js';
import { getProfile, putProfile } from './profile.service.js';



export class TextBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = props.data;
    };

    componentDidMount(){
        getProfile()
    }

    onChange = (event, newValue) => {
        this.setState({[event.target.name]: newValue});
    };

    profileEdit = (event) => {
        const name = this.state.name;
        const surname = this.state.surname;
        const age = this.state.age;
        const gender = this.state.gender;
        const hobbies = this.state.hobbies;
        putProfile(
            name,
            surname,
            age,
            gender,
            hobbies
            )
    }

    render(){
        return(
      <div className='textBlock'>
        <TextField className='floatingLabelText'
          floatingLabelText="Email:"
          value={this.state.email}
          fullWidth={true}
          floatingLabelStyle={styles.LabelStyle}
        /><br />
        <TextField
          floatingLabelText="Name:"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          fullWidth={true}
          floatingLabelStyle={styles.LabelStyle}
        /><br />
        <TextField
          floatingLabelText="Surname:"
          defaultValue={this.state.surname}
          fullWidth={true}
          name="surname"
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        /><br />
        <TextField
          floatingLabelText="Age:"
          defaultValue={this.state.age}
          fullWidth={true}
          name='age'
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        /><br />
        <TextField
          floatingLabelText="Gender:"
          defaultValue={this.state.gender}
          fullWidth={true}
          name='gender'
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
          floatingLabelFocusStyle={styles.LabelStyle}
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
          floatingLabelStyle={styles.LabelStyle}
          floatingLabelFocusStyle={styles.LabelStyle}
        />
        <FlatButton onTouchTap={this.profileEdit} 
        label="Edit profile" primary={true} fullWidth={true} 
        rippleColor={blue500} />
      </div>
    );
};
}
