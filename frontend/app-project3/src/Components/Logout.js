import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Auth/AuthService'

class Logout extends Component {
    
    logoutUser = () =>{
        this.service = new AuthService();
        this.service.logout()
        .then(() => {
          this.props.setUser(null);  
        })
      }

    render() {
        return (
            <div>
                <Link to ='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </div>
        )
    }
}

export default Logout