import React from "react";

export default class Registration extends React.Component {

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
        alert('A email was submitted: ' + this.state.email);
        alert('A password was submitted: ' + this.state.password);
        this.props.history.push("/home")
        event.preventDefault();
    }

    render() {
        return (
            <main>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="text" value={this.state.name} onChange={this.handleEmail} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                    <input type="submit" value="Registrate" />
                </form>
            </main>
        );
    }
}