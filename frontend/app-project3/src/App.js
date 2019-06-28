import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Student from './Components/Student';
import Teacher from './Components/Teacher';
import AuthService from "./Auth/AuthService";
import SubjectDetails from "./Components/SubjectDetails";

class App extends Component {
  state = {
    user: null,
    redirect: false,
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

  logoutUser = () => {
    this.service = new AuthService();
    this.service.logout()
      .then(() => {
        this.setUser(null);
        this.props.history.push("/");
      })
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
        <Route path="/student" render={(routeProps) => {
          console.log(this.state)
          return <Student {...routeProps} currentUser={this.state.user} setUser={this.setUser} logoutUser={this.logoutUser} />
        }} />
        <Route path="/teacher" render={(routeProps) => <Teacher {...routeProps} currentUser={this.state.user} setUser={this.setUser} logoutUser={this.logoutUser} />} />
        <Route path="/subjects/get/:subjectId" render={(props) => <SubjectDetails {...props} logoutUser={this.logoutUser} />} />
      </Switch>
    )
  }
}



export default withRouter(App);