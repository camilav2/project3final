import React, { Component } from 'react';
import axios from "axios";
import MainYoutube from './Youtube/MainYoutube';
import MainChat from './Chat/MainChat';

export default class SubjectDetails extends Component {
  constructor(props) {
    super(props);
  this.state = {
    subject: "",
    user: this.props.currentUser
  }
  this.addQuestion = this.addQuestion.bind(this);
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

addQuestion(questionString){
  const { match: { params } } = this.props;
  const question = {subjectId: params.subjectId, userId: this.state.user._id, question: questionString }
  axios.post("http://localhost:5000/subjects/post/question", question)
    .then(question => {
    console.log('question', question);
    this.setState({ question: question.data });
  })
  .catch((err) => {
    console.log({
      message: err.message
    })
})
}


  render() {
    return (
      <div>
        <h1>Welcome to the {this.state.subject.name} page</h1>
        <button onClick={() => this.props.logoutUser()}>Logout</button>
        <div className = "youtube">
          <MainYoutube subject={this.state.subject.name}/>
          <MainChat currentUser ={this.state.user} addQuestion={this.addQuestion}/>
        </div>
        
      </div>
    )
  }
}