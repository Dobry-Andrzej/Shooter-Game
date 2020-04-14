import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Menu.css';
import history from "../../routing/History";

const Menu = () => {
    return (
        <div>
            <div className="container">
                <Button variant="contained" className="btn btn-success" onClick={() => history.push("/Login")}>Log In</Button>
                <Button variant="contained" className="btn btn-success" onClick={() => history.push("/Register")}>Sign Up</Button>
                <div className="row">
                    <div className="col-md-6 col-sm-8 col-xs-12 col-md-offset-3 col-sm-offset-2">
                        <div className="card">

                            <div className="image">
                                <img
                                    src="https://images.pexels.com/photos/889709/pexels-photo-889709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                    width="100%"/>
                            </div>

                            <div className="text">

                                <div className="fab">
                                    <form>
                                        <Button variant="contained" color="primary" className="btn btn-success" onClick={() => history.push("/Game")}>Start Game</Button>
                                    </form>
                                </div>
                                <p>You can play without as a Guest, but there are few restrictions</p>
                                <p>Click <Button variant="contained" size='small'>HERE</Button> if you want to be convinced why should you register!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
