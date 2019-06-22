import React, { Component } from 'react';
import axios from 'axios';
import SubjectForm from './Subject-form';
import Subjects from './Subjects';
import Logout from './Logout';

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

    

    render() {
        return (
            <div>
                <Logout setUser = {this.props.setUser}/>
                <SubjectForm userId= {this.props.currentUser._id} addSubjects = {this.addSubjects}/>
                <Subjects subjects={this.state.subjects}/>
                <div className='my-students'>
                {this.state.students ? this.state.students.map(students =>
                    (
                        <div>
                            <p>{students.fullName}</p>
                            <p>{students.subjects.map(subject => {
                                return <p>{subject.name}</p>
                            })}</p>
                        </div>
                    )) : "No students present"}
                </div>
                <div className='timetable-teacher'>
                    <p>Your next class is on DATE at TIME at LOCATION/ONLINE</p>
                </div>
            </div>
        )
    }
}