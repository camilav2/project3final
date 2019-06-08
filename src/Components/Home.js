import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Login from '../Components/Login'
// import SignUp from '../Components/SignUp'

export default class Home extends Component {
     render() {
        return (
            <div>
                <h1>Welcome to My Vitural School</h1>
                <h2> The platform where students and teacher can share knowledge</h2>
                <div className="home-login">
                    <Login setUser={this.props.setUser} />
                </div>
                <div className="home-signup">
                    {/* <Link to='/auth/signup' setUser={this.props.setUser}> Sign Up </Link> </p> */}
                  <p>Not an user yet? <button onClick= {<Redirect to='/signup' />}> Sign Me Up! </button></p>
                </div>
            </div>
        )
    }
}

