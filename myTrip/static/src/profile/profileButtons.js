import React from 'react';
import {Link} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import './profile.less';
import { styles } from './profile.style.js'


export class Buttons extends React.Component {
  render() {
    return(
      <div className='divbutton'>
          <RaisedButton  containerElement={<Link to='/mysubscriber'/>} 
          className='button' label="My Subscribers" 
          primary={true} fullWidth={true} style={styles.button} 
          />
          <RaisedButton containerElement={<Link to='/myfriends'/>}
          className='button' label="My Friends" 
          primary={true} fullWidth={true} style={styles.button} 
          />
          <RaisedButton containerElement={<Link to='/mytrips'/>}
          className='button' label="My Trips" 
          primary={true} fullWidth={true} style={styles.button} 
          />
          <RaisedButton containerElement={<Link to='/settings'/>}
          className='button' label="Settings" 
          primary={true} fullWidth={true} style={styles.button} 
          />
      </div>
      );
  };
}
