import React from "react";
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { loginService } from './registration.service.js'
import { emailIsNotValid, EMAIL_REGEXP, fieldIsEmpty } from './../utils.js'

const style = {
    paperStyle : {
        margin:"5% auto",
        width:"40%",
    },

    PaperZDepth : 2,

    RaisedButtonStyle : {
        margin:"5%"
    },

    LabelSize : {
        fontSize:"1.2em"
    }

}

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
            <Paper style = { style.paperStyle } zDepth={ style.PaperZDepth  } >
                <div className='form_fields'>
                    <h1>LOGIN</h1>
                    <TextField
                        onChange={ this.handleEmail }
                        hintText="Email"
                        errorText={ this.state.emailError }
                        name="email"
                        type="email"
                    />
                    <TextField
                        onChange={ this.handlePassword }
                        hintText="Password"
                        errorText={ this.state.passwordError }
                        name="password"
                        type='password'
                    />
                    <RaisedButton label="Login"
                        primary={ true }
                        onTouchTap={ this.handleSubmit }
                        style={ style.RaisedButtonStyle }
                        labelStyle = { style.LabelSize }
                     />
                     <RaisedButton
                        label = "Login with Facebook"
                        primary = {true}
                        icon = { <div className='fb_icon'></div> }
                        href="http://triptrck.com/api/v1/auth/facebook_auth/"
                     />
                     <p className='serverError'>{ this.state.serverError }</p>
                </div>
            </Paper>
        );
    }
}
