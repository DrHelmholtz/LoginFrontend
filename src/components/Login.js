import React, { Component } from 'react';

import "../css/Login.css";
import axios from 'axios';
import Toast from "./Toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Login extends Component {


    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            toastList: []
        };
        this.loginFormSubmit = this.loginFormSubmit.bind(this);
        this.addFormSubmit = this.addFormSubmit.bind(this);
    }
    loginFormSubmit = event => {

        const endpoint = "http://localhost:8080/login";

        const username = this.state.username;
        const password = this.state.password;

        const user_object = {
            username: username,
            password: password
        };
        if (username === "" || password === "") {
            this.showToast('problem');
        } else {
            axios.post(endpoint, user_object).then(res => {
                if (res.status === 202) {
                    this.showToast('login');

                }
            }).catch((error) => {
                if (error.response.status === 401 || error.response.status === 404) {
                    this.showToast('incorrect');
                }
                else {
                    this.showToast('warning');
                }
            });
        }
    };
    addFormSubmit = event => {

        const endpoint = "http://localhost:8080/adduser";


        const username = this.state.username;
        const password = this.state.password;

        const user_object = {
            username: username,
            password: password
        };
        if (username === "" || password === "") {
            this.showToast('problem');
        } else {
            axios.post(endpoint, user_object).then(res => {
                if (res.status === 201) {
                    this.showToast('useradd');
                }
            }).catch((error) => {
                if (error.response.status === 409) {
                    this.showToast('userexist');
                }
                else {
                    this.showToast('warning');
                }
            });
        }
    };
    showToast = type => {
        let toastProperties;
        const id = Math.floor((Math.random() * 101) + 1);

        switch (type) {
            case 'login':
                toastProperties = {
                    id,
                    title: 'Success',
                    description: 'Login successful',
                    backgroundColor: '#5cb85c',
                    icon: <FontAwesomeIcon icon={['fa', 'check']} />
                }
                break;
            case 'useradd':
                toastProperties = {
                    id,
                    title: 'Success',
                    description: 'New user is added',
                    backgroundColor: '#5cb85c',
                    icon: <FontAwesomeIcon icon={['fa', 'check']} />
                }
                break;
            case 'incorrect':
                toastProperties = {
                    id,
                    title: 'Warning',
                    description: 'Username/password is incorrect',
                    backgroundColor: '#f0ad4e',
                    icon: <FontAwesomeIcon icon={['fas', 'ban']} />
                }
                break;
            case 'userexist':
                toastProperties = {
                    id,
                    title: 'Info',
                    description: 'Username alredy exist',
                    backgroundColor: '#5bc0de',
                    icon: <FontAwesomeIcon icon={['fas', 'times']} />
                }
                break;
            case 'warning':
                toastProperties = {
                    id,
                    title: 'Danger',
                    description: 'Unauthorized error',
                    backgroundColor: '#d9534f',
                    icon: <FontAwesomeIcon icon={['fas', 'exclamation']} />
                }
                break;
            case 'problem':
                toastProperties = {
                    id,
                    title: 'Danger',
                    description: 'Username/Password cannot be empty',
                    backgroundColor: '#d9534f',
                    icon: <FontAwesomeIcon icon={['fas', 'exclamation']} />
                }
                break;
            default:
                this.setState({ toastList: [] });
        }
        this.setState({ toastList: this.state.toastList.concat(toastProperties) })
    }

    render() {
        return (
            <>
                <div className="login">

                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" placeholder="Enter your username" onChange={(event) => { this.setState({ username: event.target.value }) }} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" onChange={(event) => { this.setState({ password: event.target.value }) }} />
                    </div>
                    <div className="form-group">
                        <button className="form-control-button" variant="primary" onClick={this.loginFormSubmit}>
                            Login
                        </button>
                        <button className="form-control-button" variant="primary" onClick={this.addFormSubmit}>
                            Add
                        </button>
                    </div>

                    <Toast
                        toastList={this.state.toastList} />
                </div>
            </>
        );
    }
}

export default Login;