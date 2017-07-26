import React from "react";
import axios from "axios"

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

class Registration_form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlePassword(event) {
        this.setState({password: event.target.value});
    }
    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    handleSubmit(event) {
        const email = this.state.email;
        const password = this.state.password;
        axios.post('/api/v1/auth/register/', {
            email,
            password
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
                    hintText="Name"
                    name="first_name"
                />
                <TextField
                    hintText="Surname"
                    name="last_name"
                />
                <TextField
                    hintText="Email"
                    name="email"
                    type="email"
                />
                <TextField
                    hintText="Password"
                    name="password"
                    type='password'
                />
                <RaisedButton label="Sign UP"
                    primary={true}
                    onTouchTap={handleSubmit}
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