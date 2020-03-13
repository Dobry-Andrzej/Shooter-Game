import React from 'react';
import './NavBar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = (props:any) => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">React Button</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"></Nav.Link>
                    <Nav.Link href="/Login">Login</Nav.Link>
                    <Nav.Link href="/Game">Game</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);