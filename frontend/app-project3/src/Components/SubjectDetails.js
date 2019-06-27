import React, { Component } from 'react';
import axios from "axios";
import Main from '../Components/Youtube/Main';
import SearchBar from '../Components/Youtube/SearchBar';
import VideoDetail from '../Components/Youtube/VideoDetail';
import VideoList from '../Components/Youtube/VideoList';
import VideoListItem from '../Components/Youtube/VideoListItem';

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
        <div className = "youtube">
        <SearchBar />
        {/* <VideoDetail />
        <VideoList />
        <VideoListItem /> */}
        {this.state.subjects ? this.state.subjects.map(subject =>
            (
              <div>
                  <p>{Main}</p>
                  
                  <p>{VideoDetail}</p>
                  <p>{VideoList}</p>
                  <p>{VideoListItem}</p>
              </div>
            )): "You added no videos yet" }
        </div>
        <button onClick={() => this.props.logoutUser()}>Logout</button>
      </div>
    )
  }
}