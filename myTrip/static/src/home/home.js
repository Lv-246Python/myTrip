import React from 'react';

import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import './home.less';
import Help from './help/Help'

const FIRST_SLIDE_INDEX = 0;
const LAST_SLIDE_INDEX = 3;
const CHANGE_SLIDE_TIME = 5000;

class PaperPageOne extends React.Component{

    render(){
        return(
            <Paper className="paperPageOne" zDepth={2}>
               <img src="static/src/img/trip.jpg" className="imgPaperOne"/>
            </Paper>
        )
    };
}

class PaperPageTwo extends React.Component{

    render(){
        return(
            <Paper className="paperPageOne" zDepth={2}>

                <img src="static/src/img/trip_social.jpg" className="imgPaperOne"/>

            </Paper>
        )
    }
}

class PaperPageThree extends React.Component{
    render(){
        return(
            <Help handler={this.props.handler}/>
        )
    }
}

class HomeTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: FIRST_SLIDE_INDEX,
      open: false,
      responseMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onMouseOverSlide = this.onMouseOverSlide.bind(this);
    this.onMouseOutSlide = this.onMouseOutSlide.bind(this);
  }

  handleChange(value){
    this.setState({
      slideIndex: value,
    });
    clearInterval(this.intervalId)
  };

  onMouseOverSlide(){
      clearInterval(this.intervalId)
  };

  onMouseOutSlide(){
      this.intervalId = setInterval(this.timer.bind(this), CHANGE_SLIDE_TIME);
  };

  timer() {
    this.setState({slideIndex: this.state.slideIndex + 1 });
    if(this.state.slideIndex >= LAST_SLIDE_INDEX) {
      this.setState({slideIndex: FIRST_SLIDE_INDEX})
    }
  }

  componentDidMount() {
      this.intervalId = setInterval(this.timer.bind(this), CHANGE_SLIDE_TIME);
  }

  //Calls at children message_buttons component to receive data.
  handler = (open, responseMessage) => {
      this.setState({
          'open':open,
          'responseMessage': responseMessage
      });
  };

    //Handles Snackbar closure
    handleRequestClose = () => {
    this.setState({
      'open': false,
    });
  };

  render() {
        return (
        <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Share your journey" value={0} />
          <Tab label="Add content" value={1} />
          <Tab label="Help" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          onMouseOver={this.onMouseOverSlide}
          onMouseOut={this.onMouseOutSlide}
        >
          <PaperPageOne/>
          <PaperPageTwo/>
          <PaperPageThree handler={this.handler}/>
        </SwipeableViews>

        <Snackbar
          open={this.state.open}
          message={this.state.responseMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
const Home = () => (
  <MuiThemeProvider>
    <HomeTab/>
  </MuiThemeProvider>
);
export default Home;
