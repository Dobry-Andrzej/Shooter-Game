import React, { Component } from 'react';
import './Game.css';
import App from '../../scripts/app';

class Game extends Component {

    render () {
        return (
            <div>
                <div>Let's start a game</div>
                <canvas id="webGlcanvas" className="Main-Canvas"></canvas>
            </div>
        )
    }
	
	componentDidMount() {
		var canvas = document.getElementById('webGlcanvas') as HTMLCanvasElement;
		var app = new App(canvas);
		app.initialize();
	}
	
}

export default Game;