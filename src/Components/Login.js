import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.service = new AuthService();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.service.login(username, password)
            .then(response => {
                this.setState({ username: "", password: "" });
                this.props.setUser(response.userDoc)
            })
            .catch(error => console.log(error))
    }

    handleDetails = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <form  className="col-4" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-name">
                        <label htmlFor="name">Username</label>
                        <input
                        autoComplete="on"
                            type="text"
                            className="form-control"
                            name="username"
                            aria-describedby="username"
                            onChange={(e) => this.handleDetails(e)}
                        />
                    </div>
                    <div className="form-password">
                        <label htmlFor="passowrd">Password</label>
                        <input
                        autoComplete="on"
                            type="password"
                            className="form-control"
                            name="password"
                            aria-describedby="password"
                            onChange={(e) => this.handleDetails(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    </form>
            </div>
        )
    }
}
