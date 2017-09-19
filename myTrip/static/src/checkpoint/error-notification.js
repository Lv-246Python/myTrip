import React from "react";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class ErrorComponentTest extends React.Component{
    constructor(){
        super()
        this.state={
            errors:{},
            open:false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps){
            console.log('notificator recieved props',nextProps)
            if(nextProps.errors != null){
                this.setState({errors:nextProps.errors,open:true})
            }
        }
    }

    handleRequestClose = () => {
        this.setState({open:false,});
    };

    render(){
        console.log('changes in notificator',this.state)
        console.log('errors-notificator component',this.state.errors)
            return(
                <div>
                    <Snackbar
                      open={this.state.open}
                      message={this.state.errors.statusText}
                      autoHideDuration={4000}
                      onRequestClose={this.handleRequestClose}/>
                </div>
            );   
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, null)(ErrorComponentTest);
