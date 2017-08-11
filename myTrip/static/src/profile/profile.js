import React from "react";
import axios from "axios";

import Paper from 'material-ui/Paper';
import { Avatars } from './profileAvatar';
import { Buttons } from './profileButtons';
import { TextBlock } from './profileEdit';

import './profile.less';

const profileURL = '/api/v1/profile/';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.profileID = this.props.match.params.id;
        this.state = {
            profile: null
        };
    }

    getProfile = () => {
        const profileID = this.profileID;
        if (profileID) {
        return axios.get(profileURL+profileID)
        .then(response => {
        const profile = response.data;
        this.setState({profile: profile});
    });
    } else {
        return axios.get(profileURL)
        .then(response => {
        const profile = response.data;
        this.setState({profile: profile});
    });
    };
    }
    
    componentDidMount(){
        this.getProfile();
    }

  render(){
    const data = this.state.profile
    return (
          <Paper className='MainPaper'  zDepth={2} >
            {data && <Avatars profile={data} />}
            {data && <TextBlock profile={data} getProfile={this.getProfile} />}
            <Buttons />
          </Paper>
      );
  };
}
