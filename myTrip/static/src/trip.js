import React from "react";
import axios from "axios"

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';

class Trip_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            status: ''
        };
        this.handleTitle = this.handlePassword.bind(this);
        this.handleDescription = this.handleEmail.bind(this);
        this.handleStatus = this.handleSubmit.bind(this);
    }
