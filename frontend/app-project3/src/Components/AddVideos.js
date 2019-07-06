import React, { Component } from 'react';
import MainYoutube from './Youtube/MainYoutube';
import axios from 'axios';

export default class AddVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser,
            subject: "",
        }
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

    goSubjectDetails() {
        const { match: { params } } = this.props;
        this.props.history.push(`/subjects/get/${params.subjectId}`);
    }

    render() {
        const { match: { params: { subjectId } } } = this.props
        return (
            <div>
                <button onClick={() => this.props.logoutUser()}>Logout</button>
                <h1>Welcome to the {this.state.subject.name} page</h1>
                <h2>Search for videos and share with your classmates</h2>
                <button onClick={() => this.goSubjectDetails()}>Back</button>
                <MainYoutube subjectId={subjectId} currentUser={this.state.user}/>
            </div>
        )
    }
}
