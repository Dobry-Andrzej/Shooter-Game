import React, { Component } from 'react';
import './Register.css';
import Button from '@material-ui/core/Button';
import axios from "axios";
import history from "../../routing/History";

interface AppState{
    username: any,
    password: any,
    email: any
}

class Register extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            email: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.currentTarget.name]: String(event.target.value) });
    };

    handleSubmit(event:any) {
        const { username, password, email } = this.state;

        axios.post('http://localhost:3000/users/add-user/', {
            login: username,
            password: password,
            email: email
        }).then((ret) => {
            if (ret.status == 200) {
                history.push({
                    pathname: '/',
                    state: {
                        message: "Registered successfully!"
                    }
                });
            }
        }, (error) => {
            if (error.response.status == 401) {
                console.log('UNATHORIZED USER');
            }
        });
        event.preventDefault();
    };


    render() {
        return (
            <div className="menuContainer">
                <div className="titleGame">Register to unlock ranked games!</div>
                <div className="loginFormContainer">
                    <form onSubmit={ this.handleSubmit } className="loginForm">
                        <input type="text"
                               placeholder="Login"
                               name="username"
                               value={this.state.username}
                               onChange={this.handleChange}
                        />
                        <input type="password"
                               placeholder="Password"
                               name="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />
                        <input type="text"
                               placeholder="Email"
                               name="email"
                               value={this.state.email}
                               onChange={this.handleChange}
                        />
                        <Button variant="contained" color="primary" type="submit">Create account</Button>
                        <p className="message"> Do you have an account?
                            <Button variant="contained" color="primary" size="small" onClick={() => history.push("/Login")}>Sign In</Button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

}
export default Register;
