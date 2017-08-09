import React from "react";

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

import { loginService } from './registration.service.js'
import { emailIsNotValid, EMAIL_REGEXP, fieldIsEmpty } from './../utils.js'
import { paperStyle, PaperZDepth, RaisedButtonStyle, LabelSize } from './registration.style.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            passwordError:'',
            emailError:'',
            serverError:''
        };
    }

    handleEmail = event => {
        this.setState({'email': event.target.value});
    }

    handlePassword = event => {
        this.setState({'password': event.target.value});
    }

    handleSubmit = event => {
        const email = this.state.email;
        const password = this.state.password;
        let emailValidation = emailIsNotValid(email);
        let passwordValidation = fieldIsEmpty(password);
        if ( !emailValidation && !passwordValidation) {
            loginService(email, password)
            .then( (response) => {
                this.props.loginHandler(true);
                this.props.history.push('/');
            })
            .catch( (error) => {
                this.setState({"serverError":error.response.data});
            })
        } else {
            this.setState({'emailError': emailValidation});
            this.setState({'passwordError': passwordValidation});
        }
        event.preventDefault();
    }
    render() {
        return (
            <Paper style = {paperStyle} zDepth={PaperZDepth} >
                <div className='form_fields'>
                    <h1>LOGIN</h1>
                    <TextField
                        onChange={this.handleEmail}
                        hintText="Email"
                        errorText={this.state.emailError}
                        name="email"
                        type="email"
                    />
                    <TextField
                        onChange={this.handlePassword}
                        hintText="Password"
                        errorText={this.state.passwordError}
                        name="password"
                        type='password'
                    />
                    <RaisedButton label="Login"
                        primary={true}
                        onTouchTap={this.handleSubmit}
                        style={RaisedButtonStyle}
                        labelStyle = {LabelSize}
                     />
                     <p className='serverError'>{this.state.serverError}</p>
                </div>
            </Paper>
        );
    }
}
