import React from 'react';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import './profile.less';

const styles = {
  button: {
    height: 75,
  },
};

const buttonLabels = {
    "My Subscriptions":'/subscribes',
    "My Friends":'/myfriends',
    "My Trips": '/my_trips',
    "Settings": '/settings'  
}

export class Buttons extends React.Component {
  render()
   {
    const buttons = Object.entries(buttonLabels).map(([key, value]) => {
        return (
            <RaisedButton key={key} containerElement={<Link to={value}/>} 
          className='button' label={key} 
          primary={true} fullWidth={true} style={styles.button} 
          />
            );
    })
    return(
      <div className='divbutton'>{buttons}</div>
      );
  };
}
