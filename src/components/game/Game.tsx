import React, { Component } from 'react';
import './Game.css';

class Game extends Component {

    render () {
        return (
            <div>
                <div>Let's start a game</div>
                <canvas className="Main-Canvas"></canvas>
            </div>
        )
    }
}

export default Game;
