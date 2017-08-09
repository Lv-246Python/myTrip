import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';
import MapsBeenHere from 'material-ui/svg-icons/maps/beenhere'
import {orange500,green600,yellow500,tealA400,blue500} from 'material-ui/styles/colors';
import './home.less';


class PaperPageOne extends React.Component{

    constructor(props){
        super(props);
        this.state={
          visibilityLabelOne:'hidden',
          visibilityLabelTwo:'hidden',
          visibilityLabelThree:'hidden',
          visibilityLabelFour:'hidden',
          visibilityLabelFive:'hidden',
        };
        this.onMouseOverTextChangeOne = this.onMouseOverTextChangeOne.bind(this);
        this.onMouseOutTextChangeOne = this.onMouseOutTextChangeOne.bind(this);
        this.onMouseOverTextChangeTwo = this.onMouseOverTextChangeTwo.bind(this);
        this.onMouseOutTextChangeTwo = this.onMouseOutTextChangeTwo.bind(this);
        this.onMouseOverTextChangeThree = this.onMouseOverTextChangeThree.bind(this);
        this.onMouseOutTextChangeThree = this.onMouseOutTextChangeThree.bind(this);
        this.onMouseOverTextChangeFour = this.onMouseOverTextChangeFour.bind(this);
        this.onMouseOutTextChangeFour = this.onMouseOutTextChangeFour.bind(this);
        this.onMouseOverTextChangeFive = this.onMouseOverTextChangeFive.bind(this);
        this.onMouseOutTextChangeFive = this.onMouseOutTextChangeFive.bind(this);
    };

    onMouseOverTextChangeOne(){
        this.setState({
            visibilityLabelOne:'visible'
        });
    }
    onMouseOutTextChangeOne(){
        this.setState({
            visibilityLabelOne:'hidden'
        });
    }
    onMouseOverTextChangeTwo(){
        this.setState({
            visibilityLabelTwo:'visible'
        });
    }
    onMouseOutTextChangeTwo(){
        this.setState({
            visibilityLabelTwo:'hidden'
        });
    }

    onMouseOverTextChangeThree(){
        this.setState({
            visibilityLabelThree:'visible'
        });
    }
    onMouseOutTextChangeThree(){
        this.setState({
            visibilityLabelThree:'hidden'
        });
    }

    onMouseOverTextChangeFour(){
        this.setState({
            visibilityLabelFour:'visible'
        });
    }
    onMouseOutTextChangeFour(){
        this.setState({
            visibilityLabelFour:'hidden'
        });
    }

    onMouseOverTextChangeFive(){
        this.setState({
            visibilityLabelFive:'visible'
        });
    }
    onMouseOutTextChangeFive(){
        this.setState({
            visibilityLabelFive:'hidden'
        });
    }


    render(){
        return(
            <Paper className="paperPageOne" zDepth={2}>
               <img src="static/src/img/trip.jpg" className="imgPaperOne"/>
               <MapsPlace className="placePageOne"
                          style={{width:64,height:64}}
                          onMouseOver={this.onMouseOverTextChangeOne}
                          onMouseOut={this.onMouseOutTextChangeOne}
               />
                <Paper className="paperOneTripPageOne" style={{backgroundColor:orange500,
                    visibility:this.state.visibilityLabelOne}}
                    zDepth={4}>
                    <span className="paperOneTripText" >Start trip</span>
                </Paper>

               <MapsAddLocation onMouseOver={this.onMouseOverTextChangeTwo}
                                onMouseOut={this.onMouseOutTextChangeTwo}
                                className="placeOneAddPageOne"
                                style={{width:64,height:64}}
               />
                <Paper className="paperTwoTripPageOne" style={{backgroundColor:green600,
                    visibility: this.state.visibilityLabelTwo}}
                       zDepth={4}>
                    <span className="paperTwoTripText">Add checkpoint</span>
                </Paper>

               <MapsAddLocation onMouseOver={this.onMouseOverTextChangeThree}
                                onMouseOut={this.onMouseOutTextChangeThree}
                                className="placeTwoAddPageOne"
                                style={{width:64,height:64}}
               />
                <Paper className="paperThreeTripPageOne" style={{backgroundColor:yellow500,
                    visibility: this.state.visibilityLabelThree}} zDepth={4}>
                    <span className="paperThreeTripText">Add checkpoint</span>
                </Paper>

                <MapsAddLocation onMouseOver={this.onMouseOverTextChangeFour}
                                 onMouseOut={this.onMouseOutTextChangeFour}
                                 className="placeThreeAddPageOne"
                                 style={{width:64,height:64}}
                />
                <Paper className="paperFourTripPageOne" style={{backgroundColor:tealA400,
                    visibility: this.state.visibilityLabelFour}} zDepth={4}>
                    <span className="paperFourTripText">Add checkpoint</span>
                </Paper>

                <MapsBeenHere onMouseOver={this.onMouseOverTextChangeFive}
                              onMouseOut={this.onMouseOutTextChangeFive}
                              className="placeEndTripPageOne"
                              style={{width:64,height:64}}
                />
                <Paper className="paperFiveTripPageOne" style={{backgroundColor:blue500,
                    visibility: this.state.visibilityLabelFive}} zDepth={4}>
                    <span className="paperFiveTripText">Finish your trip!</span>
                </Paper>
            </Paper>
        )
    };
}

class PaperPageTwo extends React.Component{

    render(){
        return(
            <Paper className="paperPageOne" zDepth={2}>

                <img src="static/src/img/trip.jpg" className="imgPaperOne"/>
                <div>
                <MapsPlace />
                <Paper  zDepth={4}>
                    <span >Start trip</span>
                </Paper>

                <MapsAddLocation />
                <Paper  zDepth={4}>
                    <span >Add checkpoint</span>
                </Paper>

                <MapsAddLocation />
                <Paper  zDepth={4}>
                    <span >Add checkpoint</span>
                </Paper>

                <MapsAddLocation />
                <Paper  zDepth={4}>
                    <span>Add checkpoint</span>
                </Paper>

                <MapsBeenHere />
                <Paper  zDepth={4}>
                    <span >Finish your trip!</span>
                </Paper>
                </div>
            </Paper>
        )
    }
}

class PaperPageThree extends React.Component{
    render(){
       let home={
            paperPageThree:{
                display:'block',
                margin:'auto',
                width:'90%'
            },
             imgPaperThree:{
                display:'block',
                margin:'auto',
                width:'100%',
             }
         };
        return(
            <Paper style={home.paperPageThree} zDepth={2}>

                 <img src="static/src/img/trip.jpg" style={home.imgPaperThree}/>

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