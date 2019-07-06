import React, { Component } from 'react';
import axios from 'axios';
import SubjectForm from './Subject-form';
import { Button } from 'antd';

export default class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            redirect: false
        }
    }

    handleSubmit = e => {
        e.preventDefault("http://localhost:5000/subjects");
        this.props.submithandler(this.state)
    };

    addSubjects = subject => {
        const updatedSubjects = [...this.state.subjects];
        updatedSubjects.push(subject)
        this.setState({ subjects: updatedSubjects })
    }

    componentDidMount() {

        axios.get("http://localhost:5000/subjects")
            .then(response => {
                this.setState({ subjects: response.data })
            })

        axios.get("http://localhost:5000/users/students")
            .then(response => {
                this.setState({ students: response.data })
            })

    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = (subjectId) => {
        this.props.history.push(`/subjects/get/${subjectId}`)
    }


    render() {
        return (
            <div>
                <div className="teacher-page">
                    <div className="existing-class">
                        <h2>Choose what class you would like to enroll</h2>
                        {this.state.subjects ? this.state.subjects.map(subject =>
                            (
                                <p>{subject.name}
                                    <Button type="primary" onClick={() => this.renderRedirect(subject._id)}>Go</Button> </p>

                            )) : "No subjects present"}
                    </div>
                    <div className="new-class">
                        <h2>Add a new class</h2>
                        <SubjectForm userId={this.props.currentUser._id} addSubjects={this.addSubjects} />
                    </div>
                </div>
                <Button type="danger" className="logout" onClick={() => this.props.logoutUser()}>Logout</Button>
            </div>
        )
    }
}