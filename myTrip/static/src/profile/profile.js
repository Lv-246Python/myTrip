import React from "react";

import Paper from 'material-ui/Paper';
import { Avatars } from './profileAvatar.js';
import { Buttons } from './profileButtons.js';
import { TextBlock } from './profileEdit.js'

import { hardcodedResponse } from './hardcodedResponse.js';
import './profile.less';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: hardcodedResponse.email,
        name: hardcodedResponse.name,
        surname: hardcodedResponse.surname,
        age: hardcodedResponse.age,
        gender: hardcodedResponse.gender,
        hobbies: hardcodedResponse.hobbies,
        avatarUrl: hardcodedResponse.avatarUrl
        }
    }
    
  render(){
    return (
          <Paper className='MainPaper'  zDepth={2} >
            <Avatars avatarSrc={this.state.avatarUrl} />
            <TextBlock data={this.state} />
            <Buttons />
          </Paper>
      );
  };
}
