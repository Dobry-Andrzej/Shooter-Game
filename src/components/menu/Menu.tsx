import React, { Component } from "react";
import history from '../../routing/History';
import "./Menu.css";

export default class Menu extends Component {
    render() {
        return (
            <div className="menuContainer">
                <div className="titleGame">
                    <h1>Home page</h1>
                    <form>
                        <button className="btn btn-success" onClick={() => history.push("/Game")}>Click button to view Game</button>
                        <button className="btn btn-success" onClick={() => history.push("/Login")}>Click button to view Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
