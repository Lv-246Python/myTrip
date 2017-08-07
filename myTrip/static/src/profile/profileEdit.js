import React from "react";
import { onlyAlpha, onlyDigit } from './../utils.js';

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { blue500 } from 'material-ui/styles/colors';
import { putProfile } from './profile.service.js';

import './profile.less';

const styles = {
  LabelStyle: {
    color: blue500,
  },
};

export class TextBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = props.data;
    };

    onChange = (event, newValue) => {
      if (event.target.name === "name" || event.target.name === "surname"){
          if (onlyAlpha(newValue)) 
          {  
            this.setState({[event.target.name]: newValue}); 
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
    profileEdit = (event) => {
        putProfile(this.state)
    }

    render(){
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
          value={this.state.name}
          name="name"
          onChange={this.onChange}
          fullWidth={true}
          floatingLabelStyle={styles.LabelStyle}
        />

        <TextField
          floatingLabelText="Surname:"
          value={this.state.surname}
          fullWidth={true}
          name="surname"
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

        <TextField
          floatingLabelText="Change avatar:"
          fullWidth={true}
          name='avatarUrl'
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        />

        <FlatButton onTouchTap={this.profileEdit} 
        label="Edit profile" primary={true} fullWidth={true} 
        rippleColor={blue500} />
      </div>
    );
};
}
