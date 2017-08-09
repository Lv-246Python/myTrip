import React from "react";

import Paper from "material-ui/Paper";

import "./help.less";
import MessageButtons from "./message_buttons";
import StaticFAQ from "./static_faq";

export default class Help extends React.Component{

   render(){
       return(
       <Paper className="helpPaper" zDepth={4}>
           <MessageButtons/>
           <StaticFAQ/>
       </Paper>
       )
   }
}
