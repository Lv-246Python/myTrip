//import React from "react";
//import axios from "axios"
//
//import Paper from 'material-ui/Paper';          // base for elements from material-ui
//import TextField from 'material-ui/TextField';  //
//import RaisedButton from 'material-ui/FlatButton';
//
//// create Trip-page with title, description and status, that also should have:
//// photos, checkpoints, comments, likes, author name and avatar.
//class Trip_page extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            title: '',
//            description: '',
//            status: ''
//        };
//        this.handleTitle = this.handlePassword.bind(this);
//        this.handleDescription = this.handleEmail.bind(this);
//        this.handleStatus = this.handleSubmit.bind(this);
//    }};
//
//// create block for paper with world map
//const trip={
//    paperWorldMap:{
//        display:'block',
//        margin:'auto',
//        width:'90%'
//    }
//};
//
//// show address of image and use block for world map
//class PaperWorldMap extends React.Component{
//    render(){
//        return(
//            <Paper style={home.paperWorldMap} zDepth={2}>
//               <img src="static/src/img/world_map.jpg"/>
//            </Paper>
//        )
//    }
//
//
//    render() {
//            return (
//            <div><PaperWorldMap/></div>
//        )}};
//
//    const Home = () => (
//      <MuiThemeProvider>
//        <Trip_page/>
//      </MuiThemeProvider>
//    );
//
//export default Trip;
