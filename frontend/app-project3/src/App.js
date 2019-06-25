import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Student from './Components/Student';
import Teacher from './Components/Teacher';
import AuthService from "./Auth/AuthService";


class App extends Component {
  state = {
    user: null,
    redirect: false
  };

  service = new AuthService();

  setUser = user => {
    this.setState({ user: user });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.service.currentUser()
        .then(response => {
          this.setState({ user: response.userDoc, redirect: true })
        })
        .catch(err => {
          this.setState({ user: null })

        })
    }
  }

  componentDidMount() {
    console.log("fetching user")
    this.fetchUser();
  }



  render() {

    if (!this.state.user) {
      return <Home setUser={this.setUser} />
    }

    return (
      <Switch>
        <Route exact path="/" render={() => (
            (this.state.user.occupation === "teacher") ?
              (<Redirect to="/teacher" />) :
              (<Redirect to="/student" />)
        )} />
        <Route path="/student" render={() => {
          console.log(this.state)
        return <Student currentUser={this.state.user} setUser={this.setUser}/> }} />
        <Route path="/teacher" render={() => <Teacher currentUser={this.state.user} setUser={this.setUser} /> } />
        <Route path="/logout" render={() => <Home currentUser={this.state.user} /> } />
      </Switch>
    )
  }
}



  export default App;