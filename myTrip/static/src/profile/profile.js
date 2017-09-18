import React from "react";
import axios from "axios";

import Paper from 'material-ui/Paper';
import ProfileAvatar from './profileAvatar';
import Avatar from 'material-ui/Avatar';
import Subscribes from "../subscribe/Subscribes";
import { Buttons } from './profileButtons';
import { ProfileNavigation } from './profileNavigation';
import { ProfileEdit } from './profileEdit';

import { logged } from '../utils';

import './profile.less';

const profileURL = '/api/v1/profile/';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.profileID = this.props.match.params.id || '';
        this.state = {
            profile: null
        };
    }
    componentDidMount(){
        this.getProfile();
    }

    getProfile = () => {
        axios.get(profileURL)
        .then(response => {
        const profile = response.data;
        this.setState({profile: profile});
        });
    };

    updateProfile = (data) => {
        this.setState({profile: data});
    }
    
    render(){
    const data = this.state.profile
    let profileElement;
    if (logged()) {
        profileElement = (
          <Paper className='MainPaper'  zDepth={2} > 
            {data && <ProfileAvatar src={this.state.profile.avatar} updateProfile={this.updateProfile} />}
            {data && <ProfileEdit profile={data} getProfile={this.getProfile} updateProfile={this.updateProfile} />}
            {data && <Buttons profileId={data.user} />}
          </Paper>
          )
    } else {
        profileElement = this.props.history.push('/login')
    }
        return (
            <div>{profileElement}</div>
        );
  };
}
