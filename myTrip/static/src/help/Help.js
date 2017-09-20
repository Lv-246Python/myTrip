import React from "react";

import Paper from "material-ui/Paper";

import "./help.less";
import HelpNavigation from './help_navigation';
import MessageButtons from "./message_buttons";
import StaticFAQ from "./static_faq";

export default class Help extends React.Component{

    render(){
        return(
            <div className='helpPage'>
                <div className='side'>
                    <HelpNavigation />
                </div>

                <Paper className="helpPaper" zDepth={1}>
                   <StaticFAQ/>
                   <MessageButtons handler={this.props.handler}/>
                </Paper>

                <div className='side'>
                </div>
            </div>
       )
   }
}
