import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Menu.css';
import history from "../../routing/History";

const Menu = () => {
    return (
        <div>
            <Button variant="contained" className="btn btn-success" onClick={() => history.push("/Login")}>Log In</Button>
            <Button variant="contained" className="btn btn-success" onClick={() => history.push("/Register")}>Sign Up</Button>
            <div className='menuContainer'>
                <form>
                    <Button variant="contained" color="primary" className="btn btn-success" onClick={() => history.push("/Game")}>Start Game</Button>
                </form>
            </div>
        </div>
    );
};

export default Menu;
