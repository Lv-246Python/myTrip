import React from "react";
import {withRouter} from "react-router-dom";

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import service from './service'
import { emailIsNotValid, EMAIL_REGEXP, fieldIsEmpty } from '../utils'

const style = {
    paperStyle : {
        margin:"5% auto",
        width:"40%",
    },

    PaperZDepth : 2,
}

class TestRestorePass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            pass_confrim:'',
            error:'',
            send: false,
            token: this.props.match.params.token
        };
    }

    handleEmail = event => {
        this.setState({email: event.target.value});
    }

    handlePassword = event => {
        this.setState({password: event.target.value});
    }

    handlePasswordRepeat = event => {
        this.setState({pass_confrim: event.target.value});
    }

    handleSend = event => {
        const email = this.state.email;
        let emailValidation = emailIsNotValid(email);
        if ( !emailValidation) {
            service.restorePassword(email)
            .then( (response) => {
                this.setState({error:''});
                this.setState({send:true});
            })
            .catch( (error) => {
                this.setState({error:error.response.data});
            })
        } else {
            this.setState({error: emailValidation});
        }
        event.preventDefault();
    }

    checkFields = () =>{
        let pass = this.state.password;
        let confrim = this.state.pass_confrim;
        if(pass.length > 0 && confrim.length > 0){
            if(pass == confrim){
                return true
            }
            this.setState({error: 'fields dont match'});
            return false
        }
        this.setState({error: 'fields cant be empty'});
        return false
    }

    handleRestore = event => {
        if ( this.checkFields()) {
            service.newPassword(this.state.password, this.state.token)
            .then( (response) => {
                this.setState({error:''});
                this.props.history.push('/login');
            })
            .catch( (error) => {
                this.setState({error:error.response.data});
            })
        }
        event.preventDefault();
    }

    render() {
        if(this.state.send == false && this.state.token == undefined){
            return (
            <Paper style = { style.paperStyle } zDepth={ style.PaperZDepth  } >
                <div className='form_fields'>
                    <h1>Restore password</h1>
                    <TextField
                        onChange={ this.handleEmail }
                        hintText="Email"
                        name="email"
                        type="email"
                    />
                    <RaisedButton label="Send"
                        primary={ true }
                        onTouchTap={ this.handleSend }
                     />
                     <p className='serverError'>{ this.state.error }</p>
                </div>
            </Paper>
        );
        }
        // ||||||||||||||||||||||||||||||||||||||||||||||
        
        if (this.state.send == true){
            return(
                    <Paper style={style.paperStyle} zDepth={style.PaperZDepth}>
                        <h1>Check your email</h1>
                    </Paper>
                );
        }
        //|||||||||||||||||||||||||||||||||||||||||||||||

        if(this.state.token != undefined){
            return(
                <Paper style = { style.paperStyle } zDepth={ style.PaperZDepth  } >
                <div className='form_fields'>
                    <h1>Restore password</h1>
                    <TextField
                        onChange={ this.handlePassword }
                        hintText="new password"
                        name="password"
                        type="password"
                    />
                    <TextField
                        onChange={ this.handlePasswordRepeat }
                        hintText="repeat password"
                        name="password"
                        type="password"
                    />
                    <RaisedButton label="Restore"
                        primary={ true }
                        onTouchTap={ this.handleRestore }
                     />
                     <p className='serverError'>{ this.state.error }</p>
                </div>
            </Paper>
                );
        }
    }
}

export default withRouter(TestRestorePass);
