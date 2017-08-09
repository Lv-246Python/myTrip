import React from "react"

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './header';
import MainRoute from './route';
import NotFound from './notFound';
import { logged } from './utils'

injectTapEventPlugin();

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'logged':false};
    }
    componentWillMount() {
        this.setState({logged:logged()});
    }
    loginHandler = value => {
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
