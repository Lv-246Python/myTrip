import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';

const home={
    paperPageOne:{
        display:'block',
        margin:'auto',
        width:'95%',

    },
    imgPaperOne:{
       display:'block',
        margin:'auto',
    },
    placePageOne:{
       width: 60,
       height: 60,
       bottom:'25%',
       left:'50%'

    }
};

let iconStyles = {
            width: 60,
            height: 60,
        };

class PaperPageOne extends React.Component{

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    };

    onClick(){
        return React.createClassReact.createClass({
          render() {
            return {
              type: 'Paper',
              props: {
                className: 'add_checkpoint',
                children: {
                  type: 'b',
                  props: {
                    children: 'Add checkpoint'
                  }
                }
              }
            };
          }
        })
    };

    render(){
        return(
            <Paper style={home.paperPageOne} zDepth={2}>
               <img src="static/src/img/trip.jpg" style={home.imgPaperOne}/>
               <MapsPlace style={home.placePageOne} onClick={this.onClick}/>
               <MapsAddLocation className={"second_checkpoint"} style={iconStyles}/>
               <MapsAddLocation className={"third_checkpoint"} style={iconStyles}/>
            </Paper>
        )
    };
}

class PaperPageTwo extends React.Component{
    render(){
        return(
            <Paper className={"paper"} zDepth={2}>
               <img src="static/src/img/trip.jpg" style={home.imgPaperOne}/>
               <MapsAddLocation className={"fourth_checkpoint"} style={iconStyles}/>
               <MapsAddLocation className={"fifth_checkpoint"} style={iconStyles}/>
               <MapsAddLocation className={"sixth_checkpoint"} style={iconStyles}/>
            </Paper>
        )
    }
}

class PaperPageThree extends React.Component{
    render(){
        return(
            <Paper className={"paper"} zDepth={2}>
               <img src="static/src/img/trip.jpg"/>
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
  }

  handleChange(value){
    this.setState({
      slideIndex: value,
    });
    clearInterval(this.intervalId)
  };

  timer() {
    this.setState({slideIndex: this.state.slideIndex + 1});
    if(this.state.slideIndex >= 3) {
      this.setState({slideIndex: 0})
    }
  }

  componentDidMount() {
      this.intervalId = setInterval(this.timer.bind(this), 2000);
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