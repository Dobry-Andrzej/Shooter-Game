import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './Menu.css';
import Game from '../game/Game';

class MainMenu extends Component {

    render() {
        return (
            <div className="Menu">
                <BrowserRouter>
                    <header>
                        <nav>
                                <span><Link className="Link" to={{
                                    pathname: '/join-game'
                                }}>Shoot 'Em ! ! !</Link></span>
                        </nav>
                        <Route path="/join-game" component={Game} />
                    </header>
                </BrowserRouter>
            </div>
        )
    }
}

export default MainMenu;
