import React from 'react';

import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import { logged } from '../utils';
import { Tabs, Tab } from 'material-ui/Tabs';
import AllTripsIcon from 'material-ui/svg-icons/maps/map';
import AnnounceIcon from 'material-ui/svg-icons/action/today';
import DoneIcon from 'material-ui/svg-icons/toggle/check-box';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import HomeNavigation from './home_navigation';
import MyTripsIcon from 'material-ui/svg-icons/maps/terrain';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import ProgressIcon from 'material-ui/svg-icons/action/trending-up';
import Snackbar from 'material-ui/Snackbar';
import SwipeableViews from 'react-swipeable-views';

import './home.less';

const FIRST_SLIDE_INDEX = 0;
const LAST_SLIDE_INDEX = 3;
const CHANGE_SLIDE_TIME = 5000;

class PaperPageOne extends React.Component{

    render(){
        return(
            <div className='paperPage'>
                <img src="/static/src/img/1_page.jpg" className="imgPaperOne"/>

            </div>
        )
    };
}

class PaperPageTwo extends React.Component{

    render(){
        return(
            <div className='paperPage'>
                <img src="/static/src/img/2_page.jpg" className="imgPaperOne"/>
            </div>
        )
    }
}

class PaperPageThree extends React.Component{
    render(){
        return(
            <div className='paperPage'>
                <img src="/static/src/img/3_page.jpg" className="imgPaperOne"/>
            </div>
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
      if(this.refs.Slider)
      this.intervalId = setInterval(this.timer.bind(this), CHANGE_SLIDE_TIME);
  }

  componentWillUnmount () {
    this.intervalId && clearInterval(this.intervalId);
    this.intervalId = false;
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
            <div className='HolyGrail'>
                 <div className='homePage'>
                    <div className='homeContent'>
                        <Tabs
                            onChange={this.handleChange}
                            value={this.state.slideIndex}
                        >
                            <Tab label="Start trip" value={0} />
                            <Tab label="Add content" value={1} />
                            <Tab label="Share your adventure" value={2} />
                        </Tabs>

                        <SwipeableViews
                          index={this.state.slideIndex}
                          onChangeIndex={this.handleChange}
                          onMouseOver={this.onMouseOverSlide}
                          onMouseOut={this.onMouseOutSlide}
                          ref="Slider"
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
                    <div className='homeNavigation'>
                        <HomeNavigation />
                    </div>
                    <aside className='HolyGrail-right'>
                    </aside>
                </div>
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
