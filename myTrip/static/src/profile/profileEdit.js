import React from "react";

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
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
        this.setState({[event.target.name]: newValue});
    };

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
        <TextField
          floatingLabelText="Age:"
          value={this.state.age}
          fullWidth={true}
          name='age'
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        /><br />
        <TextField
          floatingLabelText="Gender:"
          value={this.state.gender}
          fullWidth={true}
          name='gender'
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        />
        <TextField
          floatingLabelText="Hobbies:"
          value={this.state.hobbies}
          fullWidth={true}
          name='hobbies'
          multiLine={true}
          onChange={this.onChange}
          rows={2}
          rowsMax={5}
          floatingLabelStyle={styles.LabelStyle}
        />
        <FlatButton onTouchTap={this.profileEdit} 
        label="Edit profile" primary={true} fullWidth={true} 
        rippleColor={blue500} />
      </div>
    );
};
}
