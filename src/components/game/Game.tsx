import React, { Component } from 'react';
import './Game.css';
import AppController from '../../scripts/AppController';
import RightPanel from '../rightPanel/RightPanel';

class Game extends Component {

    render () {
        return (
            <div className="titleGame">
                <div>Let's start a game</div>
                <canvas width="800" height="600" id="webGlcanvas" className="Main-Canvas"></canvas>
				<RightPanel />
            </div>
        )
    }
	
	componentDidMount() {
		const canvas = document.getElementById('webGlcanvas') as HTMLCanvasElement;
		
		AppController.init(canvas);
	}
	
}

export default Game;
