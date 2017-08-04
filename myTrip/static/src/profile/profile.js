import React from "react";


import Paper from 'material-ui/Paper';
import { Avatars } from './profileAvatar.js';
import { Buttons } from './profileButtons.js';
import { TextBlock } from './profileEdit.js'

import './profile.less';


// hardcoded response
let resp = {
    email: 'someemail@gmail.com',
    name: 'Alber',
    surname: 'Unter',
    age: '35',
    gender: 'male',
    hobbies: '',
    avatar_src: 'static/src/img/avatar_example.jpg'
};


export default class Profile extends React.Component {
  render(){
    return (
          <Paper className='MainPaper' zDepth={2} >
            <Avatars data={resp}/>
            <TextBlock data={resp} />
            <Buttons />
          </Paper>
      );
  };
}
