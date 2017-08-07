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
        avatarUrl: 'static/src/img/avatar_example.jpg'
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
