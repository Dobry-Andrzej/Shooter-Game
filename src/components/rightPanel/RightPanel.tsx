import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './RightPanel.css';

class RightPanel extends Component {
    public render() {
        return (
            <div className="rightPanelContainer">
                <div className="titleRightPanel">Tu Będzie menu gry </div>
                <div id="rightPanel">
					<div>
						<span>HP: </span><span id="rightPanelHP"> 0 </span><span> /100 </span>
					</div>
				</div>
            </div>
        )
    }
	
	public funkcjaTestowa() {
		console.log("test");
	}
}

export default RightPanel;
