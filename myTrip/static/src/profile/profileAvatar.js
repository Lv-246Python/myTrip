import React from "react";
import Dropzone from 'react-dropzone';
import axios from 'axios';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import AvatarIcon from 'material-ui/svg-icons/image/portrait';
import Snackbar from 'material-ui/Snackbar';
import { blue500 } from 'material-ui/styles/colors';
import { profileURL } from './profile.service';

import './profile.less';

const styles = {
  LabelStyle: {
    color: blue500,
  },
  buttonStyle: {
    margin: 18,
  },
};


export default class ProfileAvatar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            open: false
        };
    }


    handleDrop = files => {
        const file = new FormData();
        file.append('name', files[0])
        axios.post(profileURL, file)
        .then(response => {
            const data = response.data;
            this.props.updateProfile(data);
        })
    }

    onDropRejected = () => {
        this.setState({open: true});
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render(){
        return(
       	<div className='avatar'>
        <Avatar src={this.props.src} className='avatar' size={200} />
        <FlatButton
          label="Upload new avatar"
          labelPosition="before"
          style={styles.buttonStyle}
          primary={true}
          containerElement="label"> 
              <Dropzone 
                onDrop={this.handleDrop}
                onDropRejected={this.onDropRejected} 
                maxSize={2097152}
                multiple={false}
                accept="image/*" >
              </Dropzone>
          </FlatButton>
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
