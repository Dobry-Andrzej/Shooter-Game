import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import history from "../../routing/History";
import axios from "axios";

const Login = () => {

        const { register, handleSubmit,  errors } = useForm();

        const onSubmit = (data:any) => {
            axios.post('http://localhost:3000/auth/login/', {
                username: data.username,
                password: data.password
            }).then((ret) => {
                if (ret.status == 201) {
                    history.push({
                        pathname: '/Game',
                        state: {
                            access_token: ret.data,
                            username: data.username
                        }
                    });
                }
            }, (error) => {
                if (error.response.status == 401) {
                    console.log('UNATHORIZED USER');
                }
            });
        };

        return (
            <div className="Login">
                <div className="menuContainer">
                    <div className="titleGame">Sign In and Shoot Someone!</div>
                    <div className="loginFormContainer">
                        <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                            <div>
                                <input type="text"
                                       placeholder="Nickname"
                                       name = "username"
                                       ref={register(
                                           { required: true }
                                       )}
                                />
                            </div>
                            {errors.username && <p className="login-error">Login is required!</p>}
                            <div>
                                <input type="password"
                                       placeholder="Password"
                                       name = "password"
                                       ref={register(
                                           { required: true, maxLength: 20,
                                               minLength: 2 }
                                       )}
                                />
                            </div>
                            {errors.password && <p className="login-error">Password is required and must be longer than 6 characters!</p>}
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
export default Login;

