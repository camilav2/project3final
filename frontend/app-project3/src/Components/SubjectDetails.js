import React, { Component } from 'react';
import axios from "axios";
import MainYoutube from './Youtube/MainYoutube';
import MainChat from './Chat/MainChat';
import Questions from './Questions'

export default class SubjectDetails extends Component {
  constructor(props) {
    super(props);
  this.state = {
    subject: "",
    user: this.props.currentUser,
    question: []
  }
  this.addQuestion = this.addQuestion.bind(this);
  this.getAllSubjects = this.getAllSubjects.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.getAllSubjects(params.subjectId) 
  }


  getAllSubjects(subjectId){
    axios.get(`http://localhost:5000/subjects/get/${subjectId}`)
      .then(({ data: subject }) => {
        this.setState({ subject });
    });
  }

addQuestion(questionString){
  
  const { match: { params } } = this.props;
  const question = {subjectId: params.subjectId, userId: this.state.user._id, question: questionString }

  axios.post("http://localhost:5000/subjects/post/question", question)
    .then(response => {
    console.log('question', response);
    // let questionsArray = this.state.question
    // debugger
    // questionsArray.push(response.data.question)
    // this.setState({ question: questionsArray });
    this.getAllSubjects(params.subjectId)
  })
  .catch((err) => {
    console.log({
      message: err.message
    })
   
})
}

AddVideos() {
  this.props.history.push('AddVideos');
}


  render() {
    const { match: { params: {subjectId} } } = this.props;
    return (
      <div>
        <h1>Welcome to the {this.state.subject.name} page</h1>
        <button onClick={() => this.props.logoutUser()}>Logout</button>
        <div className = "youtube">
        <button onClick={() => this.AddVideos()}>Add Videos</button>
        </div>
        <div className = "chat">
          <MainChat currentUser ={this.state.user} addQuestion={this.addQuestion}/>
        </div>
        <div className = "questions">
          <Questions currentUser ={this.state.user} 
          question={this.state.subject.questions}
          subjectId={this.state.subjectId}
          />
        </div>
        
      </div>
    )
  }
}