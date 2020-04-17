import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Menu.css';
import history from "../../routing/History";

const Menu = () => {
    return (
        <div>
            <Button variant="contained" color="primary" className="btn btn-success" onClick={() => history.push("/Game")}>Start Game</Button>
            <Button variant="contained" color="primary" className="btn btn-success" onClick={() => history.push("/Editor")}>Start Editor</Button>
        </div>
    );
};

export default Menu;
