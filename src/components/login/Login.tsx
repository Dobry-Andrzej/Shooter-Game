import React, {Component} from 'react';
import './Login.css';
import Button from '@material-ui/core/Button';
import history from "../../routing/History";
import axios from "axios";

interface AppState{
    username: any,
    password: any,
    loginErrors: any
}

class Login extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.currentTarget.name]: String(event.target.value) });
    }

    handleSubmit(event:any) {
        const { username, password, loginErrors } = this.state;

        axios.post('http://localhost:3000/auth/login/', {
            username: username,
            password: password
        }).then((ret) => {
            if (ret.status == 201) {
                history.push({
                    pathname: '/Game',
                    state: {
                        access_token: ret.data,
                        username: username
                    }
                });
            }
        }, (error) => {
            if (error.response.status == 401) {
                this.setState({loginErrors: "Wrong username or password"});
                console.log('UNATHORIZED USER');
            }
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <div className="menuContainer">
                    <div className="titleGame">Sign In and Shoot Someone!</div>
                    <div className="loginFormContainer">
                        <h2 className="login-error">{ this.state.loginErrors }</h2>
                        <form onSubmit={this.handleSubmit} className="loginForm">
                            <div>
                                <input type="text"
                                       placeholder="Nickname"
                                       name = "username"
                                       onChange={this.handleChange}
                                       value={this.state.username}
                                />
                            </div>
                            <div>
                                <input type="password"
                                       placeholder="Password"
                                       name = "password"
                                       onChange={this.handleChange}
                                       value={this.state.password}
                                />
                            </div>
                            <Button variant="contained" color="primary" type="submit">Sign In</Button>
                            <p className="message"> You don't have an account?
                                <Button variant="contained" color="primary" size="small" onClick={() => history.push("/Register")}>Register</Button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;

