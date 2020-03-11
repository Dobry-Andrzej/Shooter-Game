import React, { Component } from 'react';
import './Login.css';
class Login extends Component {

    render() {
        return (
            <div className="menuContainer">
                <div className="titleGame">Witaj w naszej kochanej grze przeglądarkowej</div>
                <div className="loginFormContainer">
                    <form className="loginForm">
                        <input type="text" placeholder="name"/>
                        <input type="password" placeholder="password"/>
                        <input type="text" placeholder="email address"/>
                        <button>Create</button>
                        <p className="message"> Masz juz konto <p>Sign In</p></p>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;

