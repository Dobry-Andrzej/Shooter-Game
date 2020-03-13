import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './Menu.css';
import Game from '../game/Game';

class MainMenu extends Component {

    render() {
        return (
            <div className="menuContainer">
                <div className="titleGame">Witaj w naszej kochanej grze przeglądarkowej</div>
                <div className="loginFormContainer">
                    <form className="loginForm">
                        <input type="text" placeholder="name"/>
                        <input type="password" placeholder="password"/>
                        <input type="text" placeholder="email address"/>
                        <button>Create</button>
                        <p className="message"> Masz juz konto <p>Sign In</p></p>
                    </form>
                </div>
                <BrowserRouter>
					<button>
							<span><Link className="link" to={{
								pathname: '/join-game'
							}}>Milosz faja ma male jaja</Link></span>
					</button>
					<Route path="/join-game" component={Game} />
                </BrowserRouter>
            </div>
        )
    }
}

export default MainMenu;
