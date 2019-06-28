import React, { Component } from 'react';
import axios from "axios";
import MainYoutube from './Youtube/MainYoutube';
import MainChat from './Chat/MainChat';

export default class SubjectDetails extends Component {
  state = {
    subject: ""
  }
  componentDidMount() {
    console.log("props", this.props)
    const { match: { params } } = this.props;
    axios.get(`http://localhost:5000/subjects/get/${params.subjectId}`)
      .then(({ data: subject }) => {
        console.log('subject', subject);

        this.setState({ subject });
      });
  }

  render() {
    return (
      <div>
        <h1>Welcome to the {this.state.subject.name} page</h1>
        <button onClick={() => this.props.logoutUser()}>Logout</button>
        <div className = "youtube">
          <MainYoutube />
          <MainChat />
        </div>
        
      </div>
    )
  }
}