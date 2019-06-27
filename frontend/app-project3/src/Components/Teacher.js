import React, { Component } from 'react';
import axios from 'axios';
import SubjectForm from './Subject-form';

export default class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    handleSubmit = e => {
        e.preventDefault("http://localhost:5000/subjects");
        this.props.submithandler(this.state)
    };

    addSubjects = subject => {
        const updatedSubjects = [...this.state.subjects];
        updatedSubjects.push(subject)
        this.setState({subjects: updatedSubjects})
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
                <button onClick={() => this.props.logoutUser()}>Logout</button>
                <SubjectForm userId={this.props.currentUser._id} addSubjects={this.addSubjects} />
                {this.state.subjects ? this.state.subjects.map(subject =>
                    (
                        <div>
                            <p>{subject.name}
                <button onClick={() => this.renderRedirect(subject._id)}>Go</button> </p>
                </div>
                 )) : "No subjects present"}

{/* create route to check students' details  */}
                <div className='my-students'>
                {this.state.students ? this.state.students.map(students =>
                    (
                        <div>
                            <p>{students.fullName}</p>
                            <p>{students.city}</p>
                            {students.subjects.map(subject => {
                                return <p>{subject.name}</p>
                            })}
                        </div>
                    )) : "No students present"}
                </div>
            </div>
        )
    }
}