import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
    button:{
        margin: 20,
    }
};

export default class MessageButtons extends React.Component{

    onChange = (event, Value) => {
        this.setState({[event.target.name]: Value});
        console.log(this.state);
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
            name="email"
            onChange={this.onChange}
           /><br/>
           <TextField
            hintText="Subject"
            floatingLabelText="Enter your subject"
            className="helpTextInput"
            name="subject"
            onChange={this.onChange}
           /><br/>
            <TextField
            hintText="Message Field"
            floatingLabelText="Enter your message"
            multiLine={true}
            rows={1}
            className="helpTextInput"
            name="message"
            onChange={this.onChange}
            /><br/>
           <RaisedButton label="Send" primary={true} style={style.button} />
            </div>
        )
    }
}
