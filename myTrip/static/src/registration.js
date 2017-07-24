import React from "react";
import axios from "axios"


class Registration_header extends React.Component {
    render() {
        return (
            <div className='registration_header'>
                    <img src="static/img/logo.png" alt="logo" /><h1>TripTracker.com</h1>
                    <p>Get started for free</p>
            </div>
        );
    }
}

class Registration_info extends React.Component {
    render() {
        return (
            <div className='registraion_info'>
                <div className='info_el'>
                    <p className='info_label'>Fun</p><p className='info_note'>
                    Get a ton of fun exploring the worldwhile sharing your journey with the rest of the world
                    </p>
                </div>
                <div className='info_el'>
                    <p className='info_label'>Easy</p><p className='info_note'>
                    Easy to use. User-friendly interface
                    </p>
                </div>
                <div className='info_el'>
                    <p className='info_label'>Connect</p><p className='info_note'>
                    With soical networks it's even easier with automatic checkpoint and media updates
                    </p>
                </div>
            </div>
        );
    }
}



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
            <div className='registration_form'>
                <h2>Registration form</h2>
                <form onSubmit={this.handleSubmit}>
                    <ul className='flex-outer'>
                        <li>
                            <label htmlFor='email'>Email:</label>
                            <input type="text" value={this.state.email} onChange={this.handleEmail} id='email'/>
                        </li>
                        <li>
                            <label htmlFor='password'>Password:</label>
                            <input type="password" value={this.state.password} onChange={this.handlePassword}
                             id='password'/>
                        </li>
                        <li>
                            <input type="submit" id='Button' value="Create free account" />
                        </li>
                    </ul>
                </form>
                <p>or get yourself started with social networks</p>
            </div>
        );
    }
}

export default class Registration extends React.Component {
    render() {
        return (
            <div>
                < Registration_header />
                <div className='centerBlock'>
                    < Registration_form history = {this.props.history} />
                    <div className='vertical-line'></div>
                    < Registration_info />
                </div>
            </div>
        );
    }
}