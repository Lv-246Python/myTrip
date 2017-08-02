import React from "react"

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './header.js';
import NotFound from './notFound.js';
import MainRoute from './route.js';

injectTapEventPlugin();

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'logged':false};
        this.loginHandler = this.loginHandler.bind(this);
    }
    componentWillMount() {
        let logged = document.cookie.indexOf('sessionid') != -1;
        this.setState({logged})
    }
    loginHandler(value) {
        this.setState({'logged':value});
    }
    render() {
        return (
           <MuiThemeProvider>
               <div>
                   <Header logged={this.state.logged} loginHandler={this.loginHandler}/>
                   <MainRoute loginHandler={this.loginHandler} />
               </div>
            </MuiThemeProvider>
        );
    }
}