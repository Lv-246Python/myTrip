import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './layout.js';


ReactDOM.render(
    <Router>
        <Layout></Layout>
    </Router>,
    document.getElementById('app')
);
