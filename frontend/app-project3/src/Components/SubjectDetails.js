import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


export default class SubjectDetails extends Component {
    state = {
        subject: ""
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params)
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
                <Link to ='/' />
                <button onClick={() => this.logoutUser()}>Logout</button>
            </div>
        )
    }
}
