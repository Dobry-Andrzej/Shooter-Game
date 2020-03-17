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
						<span>HP: <progress id="rightPanelHPProgress" value="0" max="100"> </progress> </span> <span id="rightPanelHP"> 0 </span><span> /100 </span>
					</div>
				</div>
            </div>
        )
    }
}

export default RightPanel;
