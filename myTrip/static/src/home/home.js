import React from "react";

import Paper from 'material-ui/Paper';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import SwipeableViews from 'react-swipeable-views';
import {cyan500} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './home.less';


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
         <Paper className="paperPageThree" zDepth={2}>

             <span className="enhancedText">Enhanced with social networks</span>
             <div className="flex_container">
             <Paper className="paper_fb" zDepth={4} circle={true}>
                 <div className="text_fb">facebook</div>
             </Paper>

             <Paper className="paper_instagram" zDepth={4} circle={true}>
                 <div className="text_instagram">instagram</div>
             </Paper>

             <Paper className="paper_google" zDepth={4} circle={true}>
                 <div className="text_google">google</div>
             </Paper>
            </div>
             <div>
             <FlatButton label="Register"
                         containerElement={<Link to="/registration"/>}
                         labelStyle={{fontSize:'3em'}}
                         hoverColor={cyan500}
             />
             </div>
         </Paper>
        )
    }
}

class HomeTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
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
      this.intervalId = setInterval(this.timer.bind(this), 5000);
  };

  timer() {
    this.setState({slideIndex: this.state.slideIndex + 1});
    if(this.state.slideIndex >= 3) {
      this.setState({slideIndex: 0})
    }
  }

  componentDidMount() {
      this.intervalId = setInterval(this.timer.bind(this), 5000);
  }

  render() {
        return (
        <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Share your journey" value={0} />
          <Tab label="Add content" value={1} />
          <Tab label="Social" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          onMouseOver={this.onMouseOverSlide}
          onMouseOut={this.onMouseOutSlide}
        >
          <PaperPageOne/>
          <PaperPageTwo/>
          <PaperPageThree/>
        </SwipeableViews>
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