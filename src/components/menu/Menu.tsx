import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './Menu.css';
import Game from '../game/Game';
import Login from '../login/Login';

class MainMenu extends Component {

    render() {
        return (
            <div className="menuContainer">
                <BrowserRouter>
                    <Link to="/"></Link>
                                <Link className="link" to={{
                                    pathname: '/join-game'
                                }}>Start Game</Link>
                        <Route path="/join-game"
                               component={Game}
                               exact  />
                    <Route path="/"
                           component={Login}
                           exact  />
                </BrowserRouter>
            </div>
        )
    }
}

export default MainMenu;
