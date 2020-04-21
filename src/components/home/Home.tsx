import React, { Component } from "react";
import Menu from '../menu/Menu';
import Navbar from '../navbar/Navbar'
import "./Home.css";

interface Props {
    location: any
}

export default class Home extends Component<Props> {
    render() {
        var token = localStorage.getItem("token");
        console.warn(token);
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
