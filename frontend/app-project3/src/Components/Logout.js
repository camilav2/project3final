import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import 'antd/dist/antd.css';

import { Button } from 'antd';
 
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
                <Button onClick={() => this.logoutUser()}>Logout</Button>
              </Redirect>
            </div>
        )
    }
}

export default Logout