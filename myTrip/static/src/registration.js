import React from "react";
import axios from "axios"

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

class Registration_form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', first_name: '', last_name:''};
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
    }
    handlePassword(event) {
        this.setState({password: event.target.value});
    }
    handleFirstName(event) {
        this.setState({first_name: event.target.value});
    }
    handleLastName(event) {
        this.setState({last_name: event.target.value});
    }
    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    handleSubmit(event) {
        const email = this.state.email;
        const password = this.state.password;
        axios.post('/api/v1/auth/register/', {
            email,
            password,
            first_name,
            last_name
        })
            .then(() => {
                axios.post('/api/v1/auth/login/', {
                    email,
                    password
                })
                    .then( (response) => {
                        if (response.status == 200) {
                         this.props.history.push("/home");
                        }
                    })
            });
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
                    name="email"
                    type="email"
                />
                <TextField
                    onChange={this.handlePassword}
                    hintText="Password"
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

                  <Registration_form history = {this.props.history} />

            </Paper>
        );
    }
}