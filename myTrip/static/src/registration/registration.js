import React from "react";
import axios from "axios"

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

import {loginService, registerService} from './registration.service.js';

class RegistrationForm extends React.Component {
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
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
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

    handleFirstName(event) {
        this.setState({'first_name': event.target.value});
    }
    handleLastName(event) {
        this.setState({'last_name': event.target.value});
    }
    handleSubmit(event) {
        const email = this.state.email;
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const password = this.state.password;
        if (email == '') {
            this.setState({'emailError':'Email field is required'});
            return
        } else {
            this.setState({'emailError':''});
        }
        if (password == '') {
            this.setState({'passwordError':'Password field is required'});
            return
        } else {
            this.setState({'passwordError':''});
        }
        registerService(email, password, first_name, last_name)
            .then(() => {
                    this.props.history.push('/login');
            })
            .catch( (error) => {
                this.setState({"serverError":error.response.data});
            })
        event.preventDefault();
    }
    render() {
        return (
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
export default class Registration extends React.Component {
    render() {
        return (
            <Paper
            style = {{
                  margin:"5% auto",
                  width:"40%",
            }}
            zDepth={2} >

                < RegistrationForm
                    loginHandler = {this.props.loginHandler}
                    history = {this.props.history}
                />

            </Paper>
        );
    }
}