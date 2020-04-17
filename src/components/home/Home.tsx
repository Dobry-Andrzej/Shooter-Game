import React, { Component } from "react";
import Menu from '../menu/Menu';
import Navbar from '../navbar/Navbar'
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div>
                 <Navbar />
                 
                <div className="menuContainer">
                    <div className="titleGame">
                        <h1>Blooder</h1>
                        <Menu />
                      
                    </div>
                </div>
            </div>
        );
    }
}
