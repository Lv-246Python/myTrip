import React from "react";

import Paper from 'material-ui/Paper';
import { Avatars } from './profileAvatar.js';
import { Buttons } from './profileButtons.js';
import { TextBlock } from './profileEdit.js'


import './profile.less';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: 'joegrecarlin@gmail.com',
        name: 'Joegre',
        surname: 'Carlin',
        age: 56,
        gender: 'male',
        hobbies: 'reading books, traveling',
        avatarUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-ginger-guy.png'
        }
    }
    
  render(){
    return (
          <Paper className='MainPaper'  zDepth={2} >
            <Avatars data={this.state.avatarUrl} />
            <TextBlock data={this.state} />
            <Buttons />
          </Paper>
      );
  };
}
