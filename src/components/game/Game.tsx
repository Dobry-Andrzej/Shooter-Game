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

        AppController.init(canvas);
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
				<div className="Editor-Keys">
					<p>1 - brokenWall3x4</p>
					<p>2 - brokenShed4x6</p>
					<p>3 - barrel</p>
					<p>4 - flower</p>
					<p>0 - none</p>
					<p>Q - rotate left</p>
					<p>E - rotate right</p>
				</div>
			</div>
        )
    }
}

/*
	
*/

export default Game;
