import React, { Component } from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import history from "../../routing/History";

    const  Register = () => {

        let test = {
            name: "",
            surname: "",
            login: "",
            password: "",
            admin: "",
            email: ""
        };
         axios.get('http://localhost:3000/users/users/').then(ret=>{
            test = {
                name: ret.data.name,
                surname: ret.data.surname,
                login: ret.data.login,
                password: ret.data.password,
                admin: ret.data.admin,
                email: ret.data.email
            };

            console.log(ret);
        });
        const { register, handleSubmit,  errors } = useForm();
        const options = {
            headers: {"Access-Control-Allow-Origin" : "*"},
            mode: 'cors',
        };

        const onSubmit = async (data:any) => {

            data.admin = false;
            console.warn(data);
                try {
                    for(var i = 0; i < test.name.length ; i++) {
                        if (test.login[i] === data.login || test.email[i] === data.email) {
                            console.log("test");
                        }
                    }
                    const response = await axios.post('http://localhost:3000/users/add-user/',{
                        name:data.name,
                        surname: data.surname,
                        login: data.login,
                        password: data.Password,
                        admin: data.admin,
                        email: data.email
                    },options);
                    if(response.status == 200){
                        console.log("asdasdas")
                        console.log('👉 Returned data:', response);
                        //dodać okno że rejestracja przebiegła poprawnie//
                        history.push("/Login");
                    }
                    console.log('👉 Returned data:', response);
                } catch (e) {
                    console.log(`😱 Axios request failed: ${e}`);
                }
        };
        return (
            <div className="menuContainer">
                <div className="titleGame">Witaj w naszej kochanej grze przeglądarkowej</div>
                <div className="loginFormContainer">
                    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                        <input type="text"
                               placeholder="Login"
                               name="login"
                               ref={register(
                                   {
                                       required: true ,
                                       maxLength: 15,
                                       minLength: 3
                                   }
                               )}
                        />
                        {errors.login && <p className="login-error">Login is required!</p>}
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
                                       required: true ,
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
                                       minLength: 3
                                   }
                               )}
                        />
                        {errors.surname && <p className="login-error">Surname is required!</p>}
                        <button>Create</button>
                        <p className="message"> Do you have an account? <p>Sign In</p></p>
                    </form>
                </div>
            </div>
        )
    }
export default Register;
