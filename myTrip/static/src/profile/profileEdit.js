import React from "react";
import { onlyAlpha, onlyDigit } from './../utils';

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { blue500 } from 'material-ui/styles/colors';
import { putProfile, profileURL } from './profile.service';

import './profile.less';

const styles = {
  LabelStyle: {
    color: blue500,
  },
  buttonStyle: {
    margin: 18,
  },
};

export class ProfileEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = props.profile;
        this.state.open = false;
    };

    onChange = (event, newValue) => {
      if (event.target.name === "first_name" || event.target.name === "last_name") {
          if (onlyAlpha(newValue)) 
          {  
            this.setState({[event.target.name]: newValue }); 
          }
      } else {
        this.setState({[event.target.name]: newValue});
      }
    };

    handleChangeGender = (event, index, value) => this.setState({gender: value});
    
    handleChangeAge = (event, value) => {
      if (onlyDigit(value)) {
        this.setState({age: value});
      }
    }

    handleDrop = files => {
      var file = new FormData();
      file.append('name', files[0])
      axios.post(profileURL, file)
        .then(setTimeout(function () { this.props.getProfile() }.bind(this), 1000));
    }
    onDropRejected = () => {
        this.setState({open: true});
    }

    handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

    profileEdit = () => {
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const age = this.state.age;
        const gender = this.state.gender;
        const hobbies = this.state.hobbies;
        putProfile(first_name, last_name, age, gender, hobbies)
        .then(this.props.getProfile());
    }

    render() {
        return(
      <div className='textBlock'>
        <TextField className='floatingLabelText'
          value={this.state.email}
          floatingLabelText="Email:"
          fullWidth={true}
          floatingLabelStyle={styles.LabelStyle}
        />

        <TextField
          floatingLabelText="Name:"
          value={this.state.first_name}
          name="first_name"
          onChange={this.onChange}
          fullWidth={true}
          floatingLabelStyle={styles.LabelStyle}
        />

        <TextField
          floatingLabelText="Surname:"
          value={this.state.last_name}
          fullWidth={true}
          name="last_name"
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        />

        <SelectField
          floatingLabelText="Gender:"
          value={this.state.gender}
          onChange={this.handleChangeGender}
          autoWidth={true}
          name='gender'
          floatingLabelStyle={styles.LabelStyle}>
          <MenuItem key={1} value={'Male'} primaryText="Male" />
          <MenuItem key={2} value={'Female'} primaryText="Female" />
        </SelectField>

          <TextField
          floatingLabelText="Age:"
          value={this.state.age}
          fullWidth={true}
          name="age"
          onChange={this.handleChangeAge}
          floatingLabelStyle={styles.LabelStyle}
        />

        <TextField
          floatingLabelText="Hobbies:"
          fullWidth={true}
          value={this.state.hobbies}
          name='hobbies'
          multiLine={true}
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        />

        <FlatButton
          label="Choose an Image"
          labelPosition="before"
          style={styles.buttonStyle}
          primary={true}
          fullWidth={true}
          containerElement="label"> 
              <Dropzone 
                onDrop={this.handleDrop}
                onDropRejected={this.onDropRejected} 
                maxSize={2097152}
                multiple={false}
                accept="image/*" >
              </Dropzone>
          </FlatButton>

        <FlatButton onTouchTap={this.profileEdit} 
        label="Edit profile" primary={true} fullWidth={true} 
        rippleColor={blue500} />

        <Snackbar
          open={this.state.open}
          message='Accept only images with maximum size 2MB'
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
};
}
