import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from '../../routing/history';
import "./Menu.css";
import Logo from "../home/logo.png";

export default class Menu extends Component {
    render() {
        return (
            <div className="menuContainer">
                <div className="titleGame">
                    <h1>Home page</h1>
                    <form>
                        <Button className="btn btn-success" onClick={() => history.push("/Game")}>Click button to view Game</Button>
                        <Button className="btn btn-success" onClick={() => history.push("/Login")}>Click button to view Login</Button>

                    </form>
                    <img src={Logo} alt="pokemon Milosz" />
                </div>
            </div>
        );
    }
}