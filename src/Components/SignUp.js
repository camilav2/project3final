import React, { Component } from "react";
import AuthService from '../Auth/AuthService';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {fullName: '', username: '', password: '', occupation: '' };
    this.service = new AuthService();
  }

  authService = new AuthService();

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const fullName = this.state.fullName;
    const password = this.state.password;
    const username = this.state.username;
    const occupation = this.state.occupation;

    this.service.signup(username, password, fullName, occupation)
      .then(response => {
        this.setState({
          fullName: "",
          username: "",
          password: "",
          occupation: "",
        });
        this.props.getUser(response)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <form className="col-4" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
            <label htmlFor="name">Fullname</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              aria-describedby="fullName"
              onChange={(e) => this.changeHandler(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              aria-describedby="username"
              onChange={(e) => this.changeHandler(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              aria-describedby="password"
              onChange={(e) => this.changeHandler(e)}
            />
          </div>
          <div onChange={e => this.changeHandler(e)}>
          <input type="radio" name="occupation" value="student" id="student" />{" "}
          <label htmlFor="student">Student</label>
          <input type="radio" name="occupation" value="teacher" id="rice" />{" "}
          <label htmlFor="teacher">Teacher</label>
          </div>
          <button type="submit" className="btn btn-primary">Create the Account</button>
        </form>
        <h2>Hello!!</h2>
        <h2>Welcome to My Virtual School</h2>

      </div>
    )
  }
}

export default SignUp;