import React from "react";
import axios from "axios"

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

import {loginService} from './registration.service.js'



class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            passwordError:'',
            emailError:'',
            serverError:''
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleEmail(event) {
        this.setState({'email': event.target.value});
    }
    handlePassword(event) {
        this.setState({'password': event.target.value});
    }

    handleSubmit(event) {
        const email = this.state.email;
        const password = this.state.password;
        if (email == '') {
            this.setState({'emailError':'Email field is required'});
            return false
        } else {
            this.setState({'emailError':''});
        }
        if (password == '') {
            this.setState({'passwordError':'Password field is required'});
            return false
        } else {
            this.setState({'passwordError':''});
        }
        loginService(email, password)
            .then( (response) => {
                this.props.loginHandler(true);
                this.props.history.push('/');
            })
            .catch( (error) => {
                this.setState({"serverError":error.response.data});
            })
        event.preventDefault();
    }
    render() {
        return (
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
                    style={{
                        margin:"5%"
                    }}
                    labelStyle = {{
                        fontSize:"1.2em"
                    }}
                 />
                 <p className='serverError'>{this.state.serverError}</p>
            </div>
        );
    }
}

export default class Login extends React.Component {
    render() {
        return (
                <Paper
                style = {{
                      margin:"5% auto",
                      width:"40%",
                }}
                zDepth={2} >

                    <LoginForm
                        loginHandler = {this.props.loginHandler}
                        history = {this.props.history}
                    />

                </Paper>
        )
    }
}