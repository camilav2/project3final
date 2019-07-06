import React, { Component } from 'react'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'

export default class Home extends Component {
    state = {
        signup: -1
    }

    toggleSignup = () => {
        this.setState({signup: this.state.signup * -1});
    }
    render() {

        if(~this.state.signup) {
            return (
                <React.Fragment>
                <SignUp />
                <button  onClick={this.toggleSignup}> Login </button>
                </React.Fragment>
            )
        }
            return (
                <div>
                    <div className = "home-title">
                    <h1>Welcome to My Vitural School</h1>
                    <h3> The platform where students and teacher can share knowledge</h3>
                    </div>
                    <div className="home-login-signup">
                    <div className="login">
                        <Login setUser={this.props.setUser} />
                    </div>
                    <div className="signup">
                        <p>Not an user yet?
                    <button  onClick={this.toggleSignup}> Sign Me Up! </button> </p>
                    </div>
                    </div>
                </div>
            )
        }
    }



