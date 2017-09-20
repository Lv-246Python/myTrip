import React from "react";
import Dropzone from 'react-dropzone';
import axios from 'axios';
import moment from 'moment';
import { onlyAlpha, onlyDigit } from './../utils';
import { putProfile, profileURL } from './profile.service';

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import AvatarIcon from 'material-ui/svg-icons/image/portrait';
import SaveIcon from 'material-ui/svg-icons/navigation/check';
import DatePicker from 'material-ui/DatePicker';
import { blue500 } from 'material-ui/styles/colors';

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
    
    handleChangeBirthday = (event, date) => {
        this.setState({birthday: date});
    }

    openDatePicker = () => {
    this.refs.dp.openDialog()
    }

    profileEdit = () => {
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const birthday = this.state.birthday;
        const gender = this.state.gender;
        const hobbies = this.state.hobbies;
        putProfile(first_name, last_name, birthday, gender, hobbies)
        .then(this.props.getProfile());
    }

    render()
       {
        return(
      <div className='textBlock'>
        <TextField 
          floatingLabelText="Email:"
          name="Email"
          value={this.state.email}
          fullWidth={true}
          underlineShow={false}
          floatingLabelStyle={styles.LabelStyle}
        />

        <TextField
          floatingLabelText="Name:"
          name="first_name"
          value={this.state.first_name}
          onChange={this.onChange}
          fullWidth={true}
          floatingLabelStyle={styles.LabelStyle}
        />

        <TextField
          floatingLabelText="Surname:"
          name="last_name"
          value={this.state.last_name}
          fullWidth={true}
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        />

        <SelectField
          floatingLabelText="Gender:"
          name='gender'
          value={this.state.gender}
          onChange={this.handleChangeGender}
          autoWidth={true}
          floatingLabelStyle={styles.LabelStyle}>
          <MenuItem key={1} value={'Male'} primaryText="Male" />
          <MenuItem key={2} value={'Female'} primaryText="Female" />
        </SelectField>

        <div className="datePicker">
        <TextField
          floatingLabelText="Birthday:"
          fullWidth={true}
          name="b-day"
          onClick={this.openDatePicker}
          value={(this.state.birthday) ? moment(this.state.birthday).format('YYYY-MM-DD'): ''}
          floatingLabelStyle={styles.LabelStyle}
        />
        <DatePicker
          style={{display:'none'}}
          ref='dp'
          onChange={this.handleChangeBirthday}
          openToYearSelection={true}
        />
        </div>

        <TextField
          floatingLabelText="Hobbies:"
          name='hobbies'
          value={this.state.hobbies}
          fullWidth={true}
          multiLine={true}
          rowsMax={10}
          onChange={this.onChange}
          floatingLabelStyle={styles.LabelStyle}
        />


        <FlatButton onTouchTap={this.profileEdit} 
        label="Save changes " labelPosition="before" icon={<SaveIcon /> }
        primary={true} fullWidth={true} rippleColor={blue500} />

      </div>
    );
};
}
