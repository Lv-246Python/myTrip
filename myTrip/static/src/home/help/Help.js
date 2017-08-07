import React from "react";

import Paper from "material-ui/Paper";

import "./help.less";
import MessageButtons from "./message_buttons";

export default class Help extends React.Component{

   render(){
       return(
       <Paper className="helpPaper" zDepth={4}>
        <MessageButtons/>
        <MessageButtons/>
       </Paper>
       )
   }
}