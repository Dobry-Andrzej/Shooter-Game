import React, { Component } from 'react';
import './Game.css';
import AppController from '../../scripts/AppController';
import RightPanel from '../rightPanel/RightPanel';

interface Props {
    location: any
}

class Game extends Component<Props> {

    componentDidMount() {

        const canvas = document.getElementById('webGlcanvas') as HTMLCanvasElement;

        AppController.enableGameEvents(canvas);
    }

    render () {
        const userNameState = this.props.location.state;
        const userName = userNameState ? userNameState.username : "Guest";
        return (
			<div className="titleGame">
				<canvas width="800" height="600" id="webGlcanvas" className="Main-Canvas"></canvas>
				<div className="Game-Menu">
					<div>Let's start a game</div>
					<p>Logged as: { userName }</p>
					<RightPanel />
				</div>
			</div>
        )
    }
}

/*
	
*/

export default Game;
