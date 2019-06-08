import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Student from './Components/Student';
import Teacher from './Components/Teacher';
import AuthService from "./Auth/AuthService";
// import SignUp from './Components/SignUp';

class App extends Component {
  state = {
    user: null,
    redirect: false
  };

  service = new AuthService();

  setUser = user => {
    this.setState({ user: user });
    console.log("console.log from setUSER:" + user.occupation)
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.service.currentUser()
        .then(response => {
          this.setState({ user: response, redirect: true })
        })
        .catch(err => {
          this.setState({ user: null })
        
        })
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    if (this.state.user === null) {
      return (
          <Home setUser={this.setUser} />
      )
    }
    if (this.state.user.occupation === 'student') {
      return (
        <Switch>
            <Route path="/student" component={Student} />
            this.state.redirect ? <Redirect to='/student' /> : "";
        </Switch>
      )
    }
    if (this.state.user.occupation === 'teacher') {
      return (
      <Switch>
        <Route path="/teacher" component={Teacher} />
        this.state.redirect ? <Redirect to='/teacher' /> : "";
      </Switch>
      ) 
    } else {
        return (
          <pre>{JSON.stringify(this.state.user, "\t",2)}</pre>
        )
      }
    }
  }



export default App;