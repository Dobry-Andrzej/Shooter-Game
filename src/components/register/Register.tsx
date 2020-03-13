import React, { Component } from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';

    const Register = () => {

        const { register, handleSubmit,  errors } = useForm();

        const onSubmit = (data:any) => {
            console.warn(data);
        };
        return (
            <div className="menuContainer">
                <div className="titleGame">Witaj w naszej kochanej grze przeglądarkowej</div>
                <div className="loginFormContainer">
                    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                        <input type="text"
                               placeholder="Username"
                               name="Username"
                               ref={register(
                                   {
                                       required: true,
                                       maxLength: 15,
                                       minLength: 3
                                   }
                               )}
                        />
                        {errors.Username && <p className="login-error">Username is required!</p>}
                        <input type="password"
                               placeholder="password"
                               name="Password"
                               ref={register(
                                   {
                                       required: true,
                                       maxLength: 20,
                                       minLength: 6
                                   }
                               )}
                        />
                        {errors.Password && <p className="login-error">Password is required and must be longer than 6 characters!</p>}
                        <input type="text"
                               placeholder="email"
                               name="email"
                               ref={register(
                                   {
                                       required: true,
                                       maxLength: 30,
                                       minLength: 6
                                   }
                               )}
                        />
                        {errors.email && <p className="login-error">email is required!</p>}
                        <input type="text"
                               placeholder="Name"
                               name="name"
                               ref={register(
                                   {
                                       required: true,
                                       maxLength: 20,
                                       minLength: 6
                                   }
                               )}
                        />
                        {errors.name && <p className="login-error">Name is required!</p>}
                        <input type="text"
                               placeholder="Surname"
                               name="surname"
                               ref={register(
                                   {
                                       required: true,
                                       maxLength: 20,
                                       minLength: 6
                                   }
                               )}
                        />
                        {errors.surname && <p className="login-error">Surname is required!</p>}
                        <button>Create</button>
                        <p className="message"> Masz juz konto <p>Sign In</p></p>
                    </form>
                </div>
            </div>
        )
    }
export default Register;
