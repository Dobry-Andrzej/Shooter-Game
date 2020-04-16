import React, { Component } from 'react';
import './Register.css';
import Button from '@material-ui/core/Button';
import axios from "axios";
import history from "../../routing/History";

interface AppState{
    username: any,
    password: any,
    email: any,
    usernameError: any,
    passwordError: any,
    emailError: any,
    errors: []
}

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


class Register extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            email: "",
            usernameError: "",
            passwordError: "",
            emailError: "",
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.currentTarget.name]: String(event.target.value) });
        const {name , value} = event.target;
        let uError, pError, eError;
        switch(name) {
            case 'username':
                uError = value.length < 5
                    ? 'Username must be 5 characters long!'
                    : 'OK';
                this.setState({usernameError: uError});
                break;
            case 'password':
                pError = value.length < 8
                    ? 'Password must be 8 characters long!'
                    : 'OK';
                this.setState({passwordError: pError});
                break;
            case 'email':
                eError = validEmailRegex.test(value)
                    ? 'OK'
                    : 'Email is not valid!';
                this.setState({emailError: eError});
                break;
            default:
                break;
        }
    };

    handleSubmit(event:any) {
        const { username, password, email } = this.state;

        axios.post('http://localhost:3000/users/add-user/', {
            login: username,
            password: password,
            email: email
        }).then((ret) => {
            console.warn(ret);
            if (ret.status == 200) {
                history.push({
                    pathname: '/',
                    state: {
                        message: "Registered successfully!"
                    }
                });
            }
        }, (error) => {
            console.warn(error);
            if (error.response.status == 401) {
                console.log('UNATHORIZED USER');
            }
        });
        event.preventDefault();
    };


    render() {

        const { usernameError, passwordError, emailError } = this.state;
        const enabled =
            usernameError == 'OK' && passwordError == 'OK' && emailError == 'OK';

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
                        <p className="register-error">{ this.state.usernameError }</p>
                        <input type="password"
                               placeholder="Password"
                               name="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />
                        <p className="register-error">{ this.state.passwordError }</p>
                        <input type="text"
                               placeholder="Email"
                               name="email"
                               value={this.state.email}
                               onChange={this.handleChange}
                        />
                        <p className="register-error">{ this.state.emailError }</p>
                        <Button disabled={!enabled} variant="contained" color="primary" type="submit">Create account</Button>
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
