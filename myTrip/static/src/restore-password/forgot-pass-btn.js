import React from "react";
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';

import './main.less';

class ForgotPassBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    };

    handleEmail = event => {
        this.props.history.push('/restore-password/');
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h3 className='btn' onTouchTap={ this.handleEmail }>Forgot password?</h3>
            </div>
        );
    }
}

export default withRouter(ForgotPassBtn);
