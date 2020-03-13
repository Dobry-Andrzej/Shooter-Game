import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Menu from "../components/menu/Menu";
import Game from "../components/game/Game";
import Login from "../components/login/Login";
import history from './History';
import Register from '../components/register/Register';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Menu} />
                    <Route path="/Game" component={Game} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Register" component={Register} />
                </Switch>
            </Router>
        )
    }
}
