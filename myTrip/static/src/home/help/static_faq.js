import React from "react";
import Paper from 'material-ui/Paper';
import "./help.less";

export default class StaticFAQ extends React.Component{
    render(){
        return(
            <div className="static_faqContainer">
                <Paper className="static_faqTitlePaper">
                    <span className="helpText">Frequently Asked Questions</span>
                </Paper>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam autem dignissimos ducimus eaque, eius eum explicabo fugiat fugit maxime minima minus natus numquam quaerat quam quasi quod repellendus vero!</span>
            </div>
        )
    }
}