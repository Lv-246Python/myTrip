import React from 'react';
import { Link } from 'react-router-dom';

import Subscribes from '../subscribe/Subscribes';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './profile.less';

const style = {
  button: {
    height: 50,
  },
};

export class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
    };
    }

    toggleDialog = () => {
        this.setState({open: !this.state.open});
    }

  render(){
    const actions = [
      <RaisedButton
        label="Close"
        primary={true}
        onClick={this.toggleDialog}
      />,
    ];
    return (

        <div className='divbutton'>
          <Dialog
          title="You subscribed on"
          actions={actions}
          open={this.state.open}
          autoScrollBodyContent={true}
          >
                  <Subscribes
                      profileId={this.props.profileId}
                  />
          </Dialog>
          
          <RaisedButton 
              className='button'
              label="My Subscriptions"
              labelPosition="before" 
              onClick={this.toggleDialog}
              primary={true} 
              fullWidth={true}
              style={style.button}
            />
          <br/>
          
          <RaisedButton 
              className='button'
              label="My Trips" 
              secondary={true} 
              fullWidth={true}
              style={style.button}
              containerElement={<Link to="/my_trips"/>} 
              />


        </div>

        )
  }

}


  //  {
  //   const buttons = Object.entries(buttonLabels).map(([key, value]) => {
  //       return (
  //           <RaisedButton key={key} containerElement={<Link to={value}/>} 
  //         className='button' label={key} 
  //         primary={true} fullWidth={true} style={styles.button} 
  //         />
  //           );
  //   })
  //   return(
  //     <div className='divbutton'>{buttons}</div>
  //     );
  // };