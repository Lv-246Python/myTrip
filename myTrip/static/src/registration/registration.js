import React from "react";

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

import {loginService, registerService} from './registration.service.js';
import { emailIsNotValid, EMAIL_REGEXP, fieldIsEmpty } from './../utils.js';
import { paperStyle, PaperZDepth, RaisedButtonStyle, LabelSize } from './registration.style.js';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name:'',
            last_name:'',
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

    handleFirstName = event => {
        this.setState({'first_name': event.target.value});
    }

    handleLastName = event => {
        this.setState({'last_name': event.target.value});
    }

    handleSubmit = event => {
        const email = this.state.email;
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const password = this.state.password;
        let emailValidation = emailIsNotValid(email);
        let passwordValidation = fieldIsEmpty(password);
        if ( !emailValidation && !passwordValidation) {
            registerService(email, password, first_name, last_name)
                .then(() => {
                        this.props.history.push('/login');
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
                    <h1>REGISTRATION</h1>
                    <TextField
                        onChange={this.handleFirstName}
                        hintText="Name"
                        name="first_name"
                    />
                    <TextField
                        onChange={this.handleLastName}
                        hintText="Surname"
                        name="last_name"
                    />
                    <TextField
                        onChange={this.handleEmail}
                        hintText="Email"
                        errorText={this.state.emailError}
                        name="email"
                        type="text"
                    />
                    <TextField
                        onChange={this.handlePassword}
                        hintText="Password"
                        errorText={this.state.passwordError}
                        name="password"
                        type='password'
                    />
                    <RaisedButton label="Sign UP"
                        primary={true}
                        onTouchTap={this.handleSubmit}
                        style={ RaisedButtonStyle }
                        labelStyle = { LabelSize }
                     />
                     <p className='serverError'>{this.state.serverError}</p>
                </div>
            </Paper>
        );
    }
}
