import React from "react";

import { Card, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import "./help.less";

let textFAQ = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam autem dignissimos ducimus
eaque, eius eum explicabo fugiat fugit maxime minima minus natus numquam quaerat quam quasi quod
repellendus vero!`

export default class StaticFAQ extends React.Component{
    render(){
        return(
            <div className="static_faqContainer">
                <CardTitle
                    title='Frequently Asked Questions'
                    className="helpTitleFAQ"
                />
                <ul className='FAQList'>
                    <li className='FAQItem'>{textFAQ}</li>
                    <li className='FAQItem'>{textFAQ}</li>
                    <li className='FAQItem'>{textFAQ}</li>
                    <li className='FAQItem'>{textFAQ}</li>
                    <li className='FAQItem'>{textFAQ}</li>
                </ul>
            </div>
        )
    }
}