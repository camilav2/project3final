import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../Auth/AuthService';


class Logout extends Component {
    
    logoutUser = () =>{
        this.service = new AuthService();
        this.service.logout()
        .then(() => {
          this.props.setUser(null);
          this.props.history.push("/");
        })
      }

    render() {
        return (
            <div>
              <Redirect to ='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Redirect>
            </div>
        )
    }
}

export default Logout