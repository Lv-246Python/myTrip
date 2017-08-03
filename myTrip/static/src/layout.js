import React from "react"

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './header.js';
import MainRoute from './route.js';
import NotFound from './notFound.js';
import { logged } from './utils.js'

injectTapEventPlugin();

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'logged':false};
        this.loginHandler = this.loginHandler.bind(this);
    }
    componentWillMount() {
        this.setState({logged:logged()});
    }
    loginHandler(value) {
        this.setState({'logged':value});
    }
    render() {
        return (
           <MuiThemeProvider>
               <div>
                   <Header loginHandler={this.loginHandler}/>
                   <MainRoute loginHandler={this.loginHandler} />
               </div>
            </MuiThemeProvider>
        );
    }
}