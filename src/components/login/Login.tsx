import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';


const Login = () => {

        const { register, handleSubmit,  errors } = useForm();

        const onSubmit = (data:any) => {
            console.warn(data);
        };

        return (
            <div className="Login">
                <div className="menuContainer">
                    <div className="titleGame">Let's Shoot Someone!</div>
                    <div className="loginFormContainer">
                        <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                            <div>
                                <input type="text"
                                       placeholder="Nickname"
                                       name = "login"
                                       ref={register(
                                           { required: true }
                                       )}
                                />
                            </div>
                            {errors.login && <p className="login-error">Login is required!</p>}
                            <div>
                                <input type="password"
                                       placeholder="Password"
                                       name = "password"
                                       ref={register(
                                           { required: true, maxLength: 20,
                                               minLength: 6 }
                                       )}
                                />
                            </div>
                            {errors.password && <p className="login-error">Password is required and must be longer than 6 characters!</p>}
                            <button type="submit">Sign In</button>
                            <p className="message"> You don't have an account? <button>Register</button></p>
                        </form>
                    </div>
                </div>
            </div>
        );
}
export default Login;

