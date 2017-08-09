import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { postHelp } from './help.service';
import { emailIsNotValid, fieldIsEmpty } from './../../utils';

const style = {
    button:{
        margin: 20,
    }
};

const CLEAR_RESPONSE_TEXT_TIME = 3000;

export default class MessageButtons extends React.Component{

    constructor(props){
        super(props);
        this.state={
            to:'',
            subject:'',
            message:'',
            emailError:'',
            subjectError:'',
            messageError:'',
            responseText:''
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
                    this.setState({'responseText': response.data});
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
            <Paper className="helpTitlePaper">
               <span className="helpText">Send your feedback</span>
           </Paper>
           <TextField
            hintText="Email"
            floatingLabelText="Enter your email"
            className="helpTextInput"
            name="to"
            onChange={this.onChange}
            errorText={this.state.emailError}
           /><br/>
           <TextField
            hintText="Subject"
            floatingLabelText="Enter your subject"
            className="helpTextInput"
            name="subject"
            onChange={this.onChange}
            errorText={this.state.subjectError}
           /><br/>
            <TextField
            hintText="Message Field"
            floatingLabelText="Enter your message"
            multiLine={true}
            rows={1}
            className="helpTextInput"
            name="message"
            onChange={this.onChange}
            errorText={this.state.messageError}
            /><br/>
           <RaisedButton label="Send" primary={true}
                         onTouchTap={this.helpPostEvent}
                         style={style.button}
           />
            <span className="helpResponseText">{this.state.responseText}</span>
            </div>
        )
    }
}
