import React, { Component } from 'react';
import './Editor.css';
import AppController from '../../scripts/AppController';
import RightPanel from '../rightPanel/RightPanel';

interface Props {
    location: any
}

class Editor extends Component<Props> {

    componentDidMount() {

        const canvas = document.getElementById('webGlcanvas') as HTMLCanvasElement;

        AppController.enableEditorEvents(canvas);
    }

    render () {
        const userNameState = this.props.location.state;
        const userName = userNameState ? userNameState.username : "Guest";
        return (
			<div className="titleGame">
				<canvas width="800" height="600" id="webGlcanvas" className="Main-Canvas"></canvas>
				<div className="Editor-Keys">
					<p>A - buildings</p>
					<p>S - barbed</p>
					<p>D - misc</p>
					<p>F - terrain</p>
					<p>G - walls</p>
					<p>Q - rotate left</p>
					<p>E - rotate right</p>
					<p>Z - toggle grid</p>
					<p>X - toggle colors</p>
					<p>C - save map</p>
				</div>
			</div>
        )
    }
}

/*
	
*/

export default Editor;
