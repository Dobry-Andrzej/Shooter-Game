import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routing/index';
ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById('root')

);
