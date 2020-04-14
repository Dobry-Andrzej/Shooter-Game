import React, { Component } from "react";
import Menu from '../menu/Menu';
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="menuContainer">
                    <div className="titleGame">
                        <h1>Shooter</h1>
                        <Menu />
                    </div>
                </div>
            </div>
        );
    }
}
