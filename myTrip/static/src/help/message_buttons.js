import React from 'react';

import { Card, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import { postHelp } from './help.service';
import { emailIsNotValid, fieldIsEmpty } from '../utils';

const style = {
    button:{
        margin: 20,
    }
};

export default class MessageButtons extends React.Component{

    constructor(props){
        super(props);
        this.state={
            open: false,
            to:'',
            subject:'',
            message:'',
            emailError:'',
            subjectError:'',
            messageError:'',
        };
    }

    onChange = (event, Value) => {
        this.setState({[event.target.name]: Value});
    };

    helpPostEvent = (event) => {
        const to = this.state.to;
        const subject = this.state.subject;
        const message = this.state.message;
        let emailValidation = emailIsNotValid(to);
        let subjectValidation = fieldIsEmpty(subject);
        let messageValidation = fieldIsEmpty(message);
        if ( !emailValidation && !subjectValidation && !messageValidation ) {
            postHelp(to, subject, message)
                .then((response) => {
                    let responseMessage = response.data;
                    //calls parent's method to send data and boolean for notification.
                    this.props.handler(true, responseMessage);
                })
        } else {
            this.setState({'emailError': emailValidation});
            this.setState({'subjectError': subjectValidation});
            this.setState({'messageError': messageValidation});
        }
        event.preventDefault();
    };

    render(){
        return(
            <div className="helpMessageContainer">
                <CardTitle
                    title='Send your feedback'
                    className='helpTitleMailSender'
                    style={{paddingBottom: 0}}
                />
                <TextField
                    hintText="Email"
                    floatingLabelText="Enter your email"
                    className="helpTextInput"
                    name="to"
                    onChange={this.onChange}
                    errorText={this.state.emailError}
                    style={{marginTop: 0}}
                /><br/>
                <TextField
                    hintText="Subject"
                    floatingLabelText="Enter your subject"
                    className="helpTextInput"
                    name="subject"
                    fullWidth={true}
                    onChange={this.onChange}
                    errorText={this.state.subjectError}
                    style={{marginTop: 0}}
                /><br/>
                <TextField
                    hintText="Message Field"
                    floatingLabelText="Enter your message"
                    multiLine={true}
                    fullWidth={true}
                    rows={1}
                    rowsMax={6}
                    className="helpTextInput"
                    name="message"
                    onChange={this.onChange}
                    errorText={this.state.messageError}
                    style={{marginTop: 0}}
                /><br/>
                <RaisedButton
                   label="Send" primary={true}
                   onTouchTap={this.helpPostEvent}
                   style={style.button}
                />
            </div>
        )
    }
}
