import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';

import './Menu.css';
import Game from '../game/Game';
import Login from '../login/Login';

class MainMenu extends Component {

    render() {
        return (
            <div className="menuContainer">
                <BrowserRouter>

                        <Route path="/join-game"
                               component={Game}
                                 />
                    <Route path="/"
                           component={Login}
                           exact  />
                    <NavLink to='/join-game'
                        activeClassName="selectedLink"
                    >StartGame</NavLink>
                </BrowserRouter>
            </div>
        )
    }
}

export default MainMenu;
